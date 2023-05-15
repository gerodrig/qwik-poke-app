import { type PropFunction, Slot, component$ } from '@builder.io/qwik';

interface ModalProps {
  showModal: boolean;
  persistent?: boolean;

  closeFn: PropFunction<() => void>;
}

export const Modal = component$(({ showModal, closeFn, persistent = false }: ModalProps) => {
  return (
    <>
      {showModal && (
        <div
        id='modal-content'
          onClick$={(event) => {
            const elementId = (event.target as HTMLDivElement).id
            if(elementId === 'modal-content' && !persistent) closeFn();
          }}
          class="fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full transition-all">
          <div class="border shadow-lg rounded-md bg-white text-black sm:w-56 md:w-96 lg:w-5/12">
            <div class="mt-3 text-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900 capitalize">
                <Slot name="title" />
              </h3>

              <div class="mt-2 px-7 py-3">
                <div class="text-sm text-gray-500 flex items-center justify-center text-center">
                  <Slot name="content" />
                </div>
              </div>

              {/* Botton */}
              <div class="items-center px-4 py-3">
                <button
                  onClick$={closeFn}
                  id="ok-btn"
                  class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
