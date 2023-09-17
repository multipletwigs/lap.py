import React from "react";

const withShowcase = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <div className="flex flex-col justify-center items-center my-24">
      <WrappedComponent {...props} />
    </div>
  );
};

export default withShowcase;
