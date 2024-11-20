"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Adjust the import path based on your project structure

interface ModalContextType {
  showModal: (config: {
    title: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
    modalClassName?: string;
    getter?: () => Promise<any>;
  }) => void;
  onClose: () => void;
  data: any | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<{
    title?: ReactNode;
    body?: ReactNode;
    modalClassName?: string;
    footer?: ReactNode;
  } | null>(null);

  const [data, setData] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = async ({
    title,
    body,
    footer,
    modalClassName,
    getter,
  }: {
    title: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
    modalClassName?: string;
    getter?: () => Promise<any>;
  }) => {
    setModalContent({
      title,
      body,
      footer,
      modalClassName: modalClassName ?? "",
    });

    if (getter) {
      try {
        const result = await getter();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      }
    } else {
      setData(null);
    }

    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setModalContent(null);
    setData(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, onClose, data }}>
      {children}
      {modalContent && modalContent.title && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className={modalContent.modalClassName || ""}>
            {
              <>
                {
                  <DialogHeader>
                    <DialogTitle>{modalContent.title}</DialogTitle>
                    <DialogDescription>
                      {modalContent.title
                        ? `${modalContent.title} details`
                        : "Modal content"}
                    </DialogDescription>
                  </DialogHeader>
                }

                {modalContent.body && (
                  <div className="mt-2">{modalContent.body}</div>
                )}
                {modalContent.footer && (
                  <DialogFooter>{modalContent.footer}</DialogFooter>
                )}
              </>
            }
          </DialogContent>
        </Dialog>
      )}
    </ModalContext.Provider>
  );
};

// Hook to use modal context
export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
