import { Dispatch, SetStateAction } from "react";

import SignIn from "@/components/SignIn";
import { createPortal } from "react-dom";

type BookmarkModalProps = {
  setIsSignInModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function BookmarkModal({
  setIsSignInModalOpen,
}: BookmarkModalProps) {
  const closeModal = () => {
    setIsSignInModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80 px-4 lg:px-8">
      <div className="flex flex-col items-end">
        <button onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <SignIn />
      </div>
    </div>,
    document.body
  );
}
