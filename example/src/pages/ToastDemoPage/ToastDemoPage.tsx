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
    NCToast,
    NCInput,
} from "@cactus/srm-component";

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
    const [list, setList] = useState<Array<ToastModel>>([]);
    const [position, setPosition] = useState<ToastPosition>(ToastPosition.TOP_RIGHT);
    const [duration, setDuration] = useState<string>("7");

    let toastProperties: ToastModel;

    const selectPosition = (e: any) => {
        positionsFields.map((field) => {
            return (field.key === e ? setPosition(field.value) : null)
        })
        setList([]);
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
                setList([]);
        }
        setList([...list, toastProperties]);
    }

    const onDurationChange = (event: string) => {
        setDuration(event);
    }

    return (
        <React.Fragment>
            <div className="d-flex flex-row m-5">
                {
                    ButtonsList.map(button =>
                        <div className="mx-2">
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

            <NCToast toastList={list} position={position} duration={Number(duration) * 1000}/>
        </React.Fragment>
    );

}
