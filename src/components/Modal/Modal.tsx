import { PropsWithChildren } from "react";

interface ModalProps {
   title: string;
}

export const Modal = (props: PropsWithChildren<ModalProps>) => {

   const { children, title } = props;

   return (
      <div className="max-w-60 mx-auto bg-primary pb-4 rounded-lg" data-testid="modal">
         {title &&
            <section className="bg-tertiary w-full p-3 rounded-t-lg text-white" data-testid="modal-title">
               <label>{title}</label>
            </section>
         }
         <section className="px-4" data-testid="modal-content">
            {children}
         </section>
      </div>
   )
}