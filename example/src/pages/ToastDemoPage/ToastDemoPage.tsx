import React, {useState} from "react";
import {
    Button,
    ButtonSize,
    ButtonTheme,
    ButtonType,
    NCToastType,
    ToastModel,
    ToastPosition,
    NCSelect,
    NCToastContainer,
    NCInput,
} from "@cactus/srm-component";
import ContextStore from "../../store";

const positionsFields = [
    {key: "Top Right", value: ToastPosition.TOP_RIGHT},
    {key: "Top Left", value: ToastPosition.TOP_LEFT},
    {key: "Bottom left", value: ToastPosition.BOTTOM_LEFT},
    {key: "Bottom Right", value: ToastPosition.BOTTOM_RIGHT},
]

const ButtonsList = [
    {
        label: 'Success',
        theme: ButtonTheme.CLASSIC,
        type: ButtonType.PRIMARY,
        toastType: NCToastType.SUCCESS,
    },
    {
        label: 'Error',
        theme: ButtonTheme.RED,
        type: ButtonType.PRIMARY,
        toastType: NCToastType.ERROR,
    }
];

export const ToastDemoPage: React.FunctionComponent = () => {
    const toastsList = ContextStore.useStoreState((s) => s.toast.list);
    const pushToast = ContextStore.useStoreActions((a) => a.toast.pushToast);
    const deleteToast = ContextStore.useStoreActions((a) => a.toast.deleteToast);
    const setToasts = ContextStore.useStoreActions((a) => a.toast.setToasts);
    const [position, setPosition] = useState<ToastPosition>(ToastPosition.TOP_RIGHT);
    const [duration, setDuration] = useState<string>("2");

    let toastProperties: ToastModel;

    const selectPosition = (e: any) => {
        positionsFields.map((field) => {
            return (field.key === e ? setPosition(field.value) : null)
        })
        setToasts([]);
    }

    const showToast = (type: NCToastType) => {
        switch (type) {
            case NCToastType.SUCCESS:
                toastProperties = new ToastModel(
                    'Success',
                    'This is a success toast component',
                    NCToastType.SUCCESS
                );
                break;
            case NCToastType.ERROR:
                toastProperties = new ToastModel(
                    'Danger',
                    'This is a error toast component',
                    NCToastType.ERROR
                );
                break;
            default:
                setToasts([]);
        }
        pushToast(toastProperties);
    }

    const onDurationChange = (event: string) => {
        setDuration(event);
    }

    return (
        <React.Fragment>
            <div className="d-flex flex-row m-5">
                {
                    ButtonsList.map((button, index) =>
                        <div key={index} className="mx-2">
                            <Button
                                label={button.label}
                                theme={button.theme}
                                type={button.type}
                                size={ButtonSize.MEDIUM}
                                setClick={() => showToast(button.toastType)}
                            />
                        </div>
                    )
                }
            </div>

            <div className="my-2">
                <h5 className="white">Position:</h5>
                <NCSelect
                    fieldName={'value'}
                    fieldValue={'key'}
                    actionHook={selectPosition}
                    selectFields={positionsFields}
                />
            </div>

            <div className="my-2">
                <h5 className="white">Display duration (in s):</h5>
                <NCInput value={duration} onChange={(event: string) => onDurationChange(event)}/>
            </div>

            <NCToastContainer toastList={toastsList} position={position} onDeleteToast={deleteToast} duration={Number(duration) * 1000}/>
        </React.Fragment>
    );

}
