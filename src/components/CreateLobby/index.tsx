import { getSnapshot } from 'mobx-state-tree';
import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import lobbyStore from '../../stores/lobby';
import { ISnapshotOutLobbyStore } from '../../stores/types';
import { GameStatus, IProps } from '../App/types';
import { onValidate } from './helpersFns';
import { BlockSpacing, FloatingInput, FormFloating } from './styledComponents';

const CreateLobby: FC<IProps> = (props) => {
  const {handleChangeGameStatus} = props;
  const store = lobbyStore.create({
    lobbyName: ''
  });

  const backToMainPage = () => {
    handleChangeGameStatus(GameStatus.MAIN);
  };

  const handleSubmit = (values: ISnapshotOutLobbyStore) => {
    const store = lobbyStore.create(values);
    store.publishLobby();
    handleChangeGameStatus(GameStatus.WAIT_CONNECT);
  };

  return (
    <Form 
      initialValues={getSnapshot(store)}
      onSubmit={handleSubmit}
      validate={onValidate}
      render={(props => (
        <>
          <AppHeader>New Lobby</AppHeader>

          <BlockSpacing>
            <Field name="lobbyName">
              {({input, meta}) => (
                <FormFloating>
                  <FloatingInput type="text" autoFocus {...input} className={meta.error && meta.touched && 'is-invalid'} />
                  <label>{(meta.error && meta.touched) ? meta.error : "Lobby Name"}</label>
                </FormFloating>
              )}
            </Field>
          </BlockSpacing>

          <BlockSpacing className="d-flex justify-content-between">
            <Field name="x">
              {({input, meta}) => (
                <FormFloating>
                  <FloatingInput type="number" className={meta.error && meta.touched && 'is-invalid'} {...input} />
                  <label>{(meta.error && meta.touched) ? meta.error : "Field size: X"}</label>
                </FormFloating>
              )}
            </Field>
            <Field name="y">
              {({input, meta}) => (
                <FormFloating>
                  <FloatingInput type="number" className={meta.error && meta.touched && 'is-invalid'} {...input} />
                  <label>{(meta.error && meta.touched) ? meta.error : "Field size: Y"}</label>
                </FormFloating>
              )}
            </Field>
          </BlockSpacing>
          
          <BlockSpacing className="d-flex justify-content-between">
            <Field name="ships4n">
              {({input, meta}) => (
                <FormFloating>
                  <FloatingInput className={meta.error && 'is-invalid'} type="number" {...input} />
                  <label>{(meta.error) ? meta.error : "4x ships count"}</label>
                </FormFloating>
              )}
            </Field>

            <Field name="ships3n">
              {({input, meta}) => (
                <FormFloating>
                  <FloatingInput className={meta.error && 'is-invalid'} type="number" {...input} />
                  <label>{(meta.error) ? meta.error : "3x ships count"}</label>
                </FormFloating>
              )}
            </Field>
          </BlockSpacing>
          
          <BlockSpacing className="d-flex justify-content-between">
            <Field name="ships2n">
              {({input, meta}) => (
                <FormFloating>
                  <FloatingInput className={meta.error && 'is-invalid'} type="number" {...input} />
                  <label>{(meta.error) ? meta.error : "2x ships count"}</label>
                </FormFloating>
              )}
            </Field>
            
            <Field name="ships1n">
              {({input, meta}) => (
                <FormFloating>
                  <FloatingInput className={meta.error && 'is-invalid'} type="number" {...input} />
                  <label>{(meta.error) ? meta.error : "1x ships count"}</label>
                </FormFloating>
              )}
            </Field>
          </BlockSpacing>
          
          <BlockSpacing className="d-flex justify-content-evenly">
            <button className="btn btn-secondary" onClick={backToMainPage}>Back</button>
            <button className="btn btn-primary" onClick={props.handleSubmit}>Create lobby</button>
          </BlockSpacing>
        </>
      ))}
    />
  );
};

export default CreateLobby;