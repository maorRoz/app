import { useCallback, useEffect, useState } from 'react';
import { useStoredAssets } from './use-stored-assets';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import qs from 'qs';
import { io } from 'socket.io-client';
import { Asset } from '../types/asset';

const DEFAULT_ASSET_STATE = {
  latestPrice: 0,
  priceRecords: [],
  timeFrame: '1m',
  isFavorite: false,
  isSubscribed: true,
};

const initSelectedAssets = (storedAssets: string[]): Record<string, Asset> =>
  storedAssets.reduce(
    (acc, storedAsset) => ({
      ...acc,
      [storedAsset]: {
        code: storedAsset,
        ...DEFAULT_ASSET_STATE,
      },
    }),
    {}
  );

export const useSelectedAssets = () => {
  const { storedAssets, onStoreAsset, onStoredAssetRemove } = useStoredAssets();

  const [selectedAssets, setSelectedAssets] = useState(
    initSelectedAssets(storedAssets)
  );

  const handleAddAsset = (assetCode: string) => {
    onStoreAsset(assetCode);
    setSelectedAssets({
      ...selectedAssets,
      [assetCode]: <Asset>{
        code: assetCode,
        ...DEFAULT_ASSET_STATE,
      },
    });
  };
  const handleRemoveAsset = (assetCode: string) => {
    onStoredAssetRemove(assetCode);
    setSelectedAssets(
      Object.entries(selectedAssets).reduce(
        (acc, [selectedAssetCode, selectedAssetValue]) =>
          selectedAssetCode === assetCode
            ? acc
            : { ...acc, [selectedAssetCode]: selectedAssetValue },
        {}
      )
    );
  };

  const updateSelectedAsset = useCallback(
    (assetCode: string, payload: Partial<Asset>) => {
      setSelectedAssets((selectedAssets) => ({
        ...selectedAssets,
        [assetCode]: { ...selectedAssets?.[assetCode], ...payload },
      }));
    },
    []
  );

  const handleToggleAssetFavorite = (assetCode: string) =>
    updateSelectedAsset(assetCode, {
      isFavorite: !selectedAssets[assetCode].isFavorite,
    });

  const handleToggleAssetSubscription = (assetCode: string) =>
    updateSelectedAsset(assetCode, {
      isSubscribed: !selectedAssets[assetCode].isSubscribed,
    });

  useQuery({
    queryKey: ['getAssets', storedAssets],
    queryFn: async () => {
      const { data } = await axios.get<
        { code: string; priceRecords: number[] }[]
      >('/api/latest-price', {
        params: { code: storedAssets },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      });

      data.forEach((asset) =>
        updateSelectedAsset(asset.code, {
          timeFrame: '1m',
          priceRecords: asset.priceRecords,
        })
      );

      return data;
    },
  });

  useEffect(() => {
    const socket = io('ws://localhost:80');

    socket.open();

    storedAssets.forEach((storedAsset) => {
      const isSubscribed = selectedAssets[storedAsset]?.isSubscribed;

      socket.on(storedAsset, (latestPrice: number) => {
        if (isSubscribed) {
          const updatedPriceRecords = [
            latestPrice,
            ...selectedAssets[storedAsset].priceRecords.slice(0, 3),
          ];
          updateSelectedAsset(storedAsset, {
            latestPrice,
            priceRecords: updatedPriceRecords,
          });
        }
      });
    });

    return () => {
      socket.close();
    };
  }, [storedAssets, selectedAssets, updateSelectedAsset]);

  return {
    selectedAssets: Object.values(selectedAssets),
    onAddAsset: handleAddAsset,
    onRemoveAsset: handleRemoveAsset,
    onToggleAssetFavorite: handleToggleAssetFavorite,
    onToggleAssetSubscription: handleToggleAssetSubscription,
  };
};
