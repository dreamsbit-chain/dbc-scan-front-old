import c from "classnames";

import s from "./ContractInfo.module.scss";

const ContractInfo = ({ data }: { data: ContractAddress }) => {
  return (
    <div className={c(s.list, s.mb20)}>
      <div className={s.row}>
        <div className={s.head}>Contract</div>
        <div className={s.body}>
          <div>{data.contractType}</div>
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;
