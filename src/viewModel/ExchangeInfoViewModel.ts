import { useEffect, useState } from "react";
import KrewurModel from "../model/KrewurModel";
import { tExchangInfoData } from "../_types/exchangeInfo";

function ExchangeInfoViewModel() {
  const [isChange, setIsChange] = useState(false);
  const [isReady, setReady] = useState(false);
  const [eurInfo, setEurInfo] = useState<tExchangInfoData>({
    basePrice: 1,
    cashBuyingPrice: 1,
    cashSellingPrice: 1,
    changePrice: 1,
    openingPrice: 1,
    ttBuyingPrice: 1,
    ttSellingPrice: 1,
  });

  const { getEurInfo } = KrewurModel();

  const setExchange = async () => {
    const data = await getEurInfo();
    if (data) {
      setIsChange(data.basePrice !== eurInfo.basePrice);
      setEurInfo({
        basePrice: data.basePrice,
        cashBuyingPrice: data.cashBuyingPrice,
        cashSellingPrice: data.cashSellingPrice,
        changePrice: data.changePrice,
        openingPrice: data.openingPrice,
        ttBuyingPrice: data.ttBuyingPrice,
        ttSellingPrice: data.ttSellingPrice,
      });
    }
  };

  useEffect(() => {
    setExchange();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEurInfo]);

  useEffect(() => {
    let buffer = setTimeout(() => setReady(true), 1000);
    return () => {
      clearTimeout(buffer);
      setReady(false);
      setIsChange(false);
    };
  }, [isChange]);

  return { eurInfo, isReady };
}

export default ExchangeInfoViewModel;
