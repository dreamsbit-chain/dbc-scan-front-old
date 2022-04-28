import React, { ComponentClass, FC } from "react";
import NotFound, { NotFoundProps } from "../components/NotFound";

interface Props {
  result: SearchResult;
  errorProps?: {
    keyword: string;
  };
}

const withResultValidator = (
  Component: FC<Props> | ComponentClass<Props>,
  pageType: PageType,
  ErrorComponent?: FC<NotFoundProps> | ComponentClass<NotFoundProps>,
) => {
  const enhanced: React.FC<Props> = ({ result, errorProps }) => {
    if (result?.pageType === pageType) {
      return <Component result={result} />;
    }
    return ErrorComponent ? (
      <ErrorComponent {...errorProps} />
    ) : (
      <NotFound {...errorProps} />
    );
  };
  return enhanced;
};

export default withResultValidator;
