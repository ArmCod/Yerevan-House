import FastSale from "../../components/fastSale/FastSale";
import { useTranslation } from 'react-i18next';

export default function FastSaleBox() {
    const {t} = useTranslation
  return <div>
    <FastSale/>
  </div>;
}
