import { VButton, VModal, VNotification } from '../ui';


const ErrorForm = (props:any) => {

    return (
        <div className="error-form">
            
            <VNotification type="error" message={props.message} />

            {
                props.showButton && (
                    <div className="mt-5 ">
                        <VButton 
                            className={`bg-red-500 w-[147px]`}
                            onClick={(e:any) => props.buttonAction()}
                        >
                            {props.buttonText}
                        </VButton>
                    </div>
                )
            }
        </div>
    );
};

const ErrorModal = (props:any) => {
    return (
        <>
            <VModal
                size='md'
                dismissible={props.dismissible ?? false} 
                displayClose={props.displayClose ?? false}
                title={props.title ?? false}
                body={<ErrorForm message={props.message} showButton={props.showButton ?? false} buttonText={props.buttonText ?? ''} buttonAction={props.buttonAction ?? (() => {})} />} 
                setIsOpen={props.setIsOpen} 
            />
        </>
    );
};

export default ErrorModal;
