import './NCAssetNgDialog.scss';

import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, NCDialog } from '../../atoms';
import { ButtonType } from '../../atoms/Button/Button';
import { NgService } from '../../services/ng.service';
import { Organization } from '../../models/Organization';

export interface NCAssetNgDialogProps {
    organization: Organization,
    tournamentId?: string,
}

export const NCAssetNgDialog: React.FunctionComponent<NCAssetNgDialogProps> = (props: NCAssetNgDialogProps) => {
    const intl = useIntl();
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ showError, setShowError ] = useState<boolean>(false);
    const [ showCode, setShowCode ] = useState<boolean>(false);
    const [ code, setCode ] = useState<string>();
    const codeLength = 4;
    const logged = !!localStorage.getItem('accessToken');

    useEffect(() => {
        handleOrganizationChange();
    }, [ props.organization.domain, logged ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCode = e.currentTarget.value.replace(/[^\d.]/g, '');
        setCode(newCode);
        if (newCode.length < codeLength) {
            setShowError(false);
        }
    };

    const updateStorage = (assetAsked: Array<string>) => {
        localStorage.setItem('assetAsked', [ ...assetAsked, props.tournamentId || props.organization.domain ].toString());
    };

    const handleOrganizationChange = async () => {
        if (!props.organization?.domain.length || !logged) {
            return;
        }

        const assetAsked = localStorage.getItem('assetAsked')?.split(',') || [];
        if (props.tournamentId && !assetAsked.includes(props.tournamentId) || (!props.tournamentId && !assetAsked.includes(props.organization.domain))) {
            const assetAccountId = `${props.organization?.domain}-asset`;
            const assetGameAccount = await NgService.getGameAccount(assetAccountId);
            if (assetGameAccount?.active) {
                const userGameAccount = await NgService.getUserGameAccount(`${props.organization.domain}-asset`);
                if (userGameAccount?.gamerTag) {
                    updateStorage(assetAsked);
                    return;
                } else {
                    setShowModal(true);
                    updateStorage(assetAsked);
                }
            }
        }
    };

    const handleSave = async() => {
        if (code) {
            const success = await NgService.createUserGameAccount(`${props.organization?.domain}-asset`, code);
            success ?
                setShowModal(false) :
                setShowError(true);
        }
    };

    return (
        <NCDialog
            show={showModal}
            setShow={(e) => setShowModal(e)}
            title={intl.formatMessage({ id: 'organization.welcome.title' }, { name: props.organization?.name })}
            wildBody
        >
            <div className='nc-asset-ng-dialog text-center white'>
                <div className='my-3'>
                    <div className='mb-4'>{intl.formatMessage({ id: 'organization.welcome.asset' }, { name: props.organization?.domain })}</div>
                    <div className='d-flex nc-asset-dialog-gap justify-content-center'>
                        <Button
                            type={ButtonType.SECONDARY}
                            label={intl.formatMessage({ id: 'ds.no' })}
                            setClick={() => setShowModal(false)}
                            color={props.organization?.color.primary}
                            textColor='white'
                        ></Button>
                        <Button
                            label={intl.formatMessage({ id: 'ds.yes' })}
                            setClick={() => setShowCode(true)}
                            color={props.organization?.color.primary}
                        ></Button>
                    </div>
                </div>
                {
                    showCode &&
                    <div className='d-flex flex-column nc-asset-dialog-gap align-items-center my-3 pt-2'>
                        <div className='mt-5'>
                            <div className='mb-4'>{intl.formatMessage({ id: 'organization.welcome.id' }, { name: props.organization?.domain })}</div>
                            <div className='code-input mx-auto d-flex'>
                                <div>ID : #</div>
                                <input
                                    minLength={codeLength}
                                    maxLength={codeLength}
                                    placeholder="____"
                                    onChange={handleInputChange}
                                    value={code}
                                ></input>
                            </div>
                        </div>
                        {
                            showError &&
                            <div className='error-container text-left'>
                                <div className='red'>{intl.formatMessage({ id: 'organization.welcome.error' })}</div>
                                <div className='white'>{intl.formatMessage({ id: 'ds.error.id.discord' })}</div>
                            </div>
                        }
                        <Button
                            label={intl.formatMessage({ id: 'ds.save' })}
                            disabled={code?.length !== codeLength || showError}
                            color={props.organization?.color.primary}
                            type={code?.length !== codeLength || showError ? ButtonType.SECONDARY : ButtonType.PRIMARY}
                            setClick={() => handleSave()}
                        />
                    </div>
                }
            </div>
        </NCDialog>
    );
};
