export default (props: any) => {
    return (
        <div className={`custom-modal relative z-50 ${props.open ? 'visible' : 'invisible'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 custom-modal__bg"></div>

            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform bg-white rounded-3xl text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <button onClick={props.closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-3xl">
                        {props.children}
                    </div>
                   
                </div>
                </div>
            </div>
        </div>
    );
}