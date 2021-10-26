import React from "react";
import { Button, ButtonTheme, ButtonType, ButtonSize, IconType, ButtonIcon } from "@cactus/srm-component"
import "./ButtonsDemoPage.scss";

export const ButtonsDemoPage: React.FunctionComponent = () => {

    const renderButton = (theme: ButtonTheme, type: ButtonType, name: string) => {
        return <div className="d-flex flex-column my-5">
            <span className="theme-title">{name}</span>
            <table>
                <tbody>
                    {renderAllSizes(theme, type)}
                </tbody>
            </table>
        </div>
    }

    const renderButtonIcon = (icon: string) => {
        return <div className="d-flex flex-column my-5">
            <span className="theme-title">Button Icon</span>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ButtonIcon icon={icon} name="test1" size={ButtonSize.BIG}/>
                        </td>
                        <td>
                            <ButtonIcon icon={icon} name="test2" size={ButtonSize.BIG} active/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ButtonIcon icon={icon} name="test3" size={ButtonSize.BIG} fancy/>
                        </td>
                        <td>
                            <ButtonIcon icon={icon} name="test4" size={ButtonSize.BIG} fancy active/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    }



    const renderAllSizes = (theme: ButtonTheme, type: ButtonType) => {
        return <>
            {renderRow(theme, type, ButtonSize.BIG, 'Big')}
            {renderRow(theme, type, ButtonSize.MEDIUM, 'Medium')}
            {renderRow(theme, type, ButtonSize.SMALL, 'Small')}
        </>
    }

    const renderRow = (theme: ButtonTheme, type: ButtonType, size: ButtonSize, name: string) => {
        return <tr>
            <td>
                {name}
            </td>
            <td>
                <Button label="Button Text" theme={theme} type={type} size={size} />
            </td>
            <td>
                <Button label="Button Text" theme={theme} type={type} size={size} disabled />
            </td>
            <td>
                <Button label="Button Text" theme={theme} type={type} size={size} icon={{ type: IconType.People, width: 24, height: 24 }} />
            </td>
            <td>
                <Button label="Button Text" theme={theme} type={type} size={size} disabled icon={{ type: IconType.People, width: 24, height: 24 }} />
            </td>
        </tr>
    }

    return (
        <div className='buttons-demo-page'>
            {renderButton(ButtonTheme.CLASSIC, ButtonType.PRIMARY, "Classic - Primary")}
            {renderButton(ButtonTheme.CLASSIC, ButtonType.SECONDARY, "Classic - Secondary")}

            {renderButton(ButtonTheme.TOURNAMENT, ButtonType.PRIMARY, "Tournament - Primary")}
            {renderButton(ButtonTheme.TOURNAMENT, ButtonType.SECONDARY, "Tournament - Secondary")}

            {renderButton(ButtonTheme.TRACKING, ButtonType.PRIMARY, "Tracking - Primary")}
            {renderButton(ButtonTheme.TRACKING, ButtonType.SECONDARY, "Tracking - Secondary")}

            {renderButton(ButtonTheme.TRAINING, ButtonType.PRIMARY, "Training - Primary")}
            {renderButton(ButtonTheme.TRAINING, ButtonType.SECONDARY, "Training - Secondary")}

            {renderButton(ButtonTheme.PREMIUM, ButtonType.PRIMARY, "Premium - Primary")}
            {renderButton(ButtonTheme.PREMIUM, ButtonType.SECONDARY, "Premium - Secondary")}

            {renderButton(ButtonTheme.RED, ButtonType.PRIMARY, "Red- Primary")}
            {renderButton(ButtonTheme.RED, ButtonType.SECONDARY, "Red- Secondary")}

            {renderButtonIcon("https://esm-prod-public.s3.eu-west-1.amazonaws.com/game/5c36302a0842120a74d1afdc/medias/IconImage")}
        </div>
    )
};
