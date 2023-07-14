import { FormatPrice } from "@/lib/format";
import { PriceTagProps } from "@/lib/types/types";

const PriceTag = ({price, className}: PriceTagProps) => {
  return (
    <span className={`badge ${className}`}>{FormatPrice(price)}</span>
  )
}

export default PriceTag