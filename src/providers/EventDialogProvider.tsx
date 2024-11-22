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

interface EventDialogContextType {
  openDialog: (config: {
    title: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
    dialogCustomClass?: string;
    getter?: () => Promise<any>;
  }) => void;
  onClose: () => void;
  data: any | null;
}

const EventDialogContext = createContext<EventDialogContextType | undefined>(
  undefined
);

export const EventDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dialogDetails, setDialogDetails] = useState<{
    title?: ReactNode;
    body?: ReactNode;
    dialogCustomClass?: string;
    footer?: ReactNode;
  } | null>(null);

  const [data, setData] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const displayDialog = async ({
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
    setDialogDetails({
      title,
      body,
      footer,
      dialogCustomClass: modalClassName ?? "",
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
    setDialogDetails(null);
    setData(null);
  };

  return (
    <EventDialogContext.Provider
      value={{ openDialog: displayDialog, onClose, data }}
    >
      {children}
      {dialogDetails && dialogDetails.title && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className={dialogDetails.dialogCustomClass || ""}>
            {
              <>
                {
                  <DialogHeader>
                    <DialogTitle>{dialogDetails.title}</DialogTitle>
                    <DialogDescription>
                      {dialogDetails.title
                        ? `${dialogDetails.title} details`
                        : "Modal content"}
                    </DialogDescription>
                  </DialogHeader>
                }

                {dialogDetails.body && (
                  <div className="mt-2">{dialogDetails.body}</div>
                )}
                {dialogDetails.footer && (
                  <DialogFooter>{dialogDetails.footer}</DialogFooter>
                )}
              </>
            }
          </DialogContent>
        </Dialog>
      )}
    </EventDialogContext.Provider>
  );
};

// Hook to use modal context
export const useEventDialogContext = (): EventDialogContextType => {
  const context = useContext(EventDialogContext);
  if (!context) {
    throw new Error(
      "useEventDialogContext must be used within a ModalProvider"
    );
  }
  return context;
};
