import { FC, ReactNode, useEffect, useRef } from "react";

export const Modal: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  // const closeButtonRef = useRef<HTMLButtonElement>(null);
  // const isOpenedOnce = useRef(false);

  // useEffect(() => {
  //   if (!isOpenedOnce.current) {
  //     isOpenedOnce.current = true;
  //   } else if (!isModalOpen) {
  //     closeButtonRef.current!.click();
  //   }
  // }, [isModalOpen]);

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
