import axios from "axios";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { useDownloadFile } from "../../customHooks/useDownloadFile";
import { Button, ButtonState } from "../button";
import { Alert, Container } from "react-bootstrap";

export const DownloadFile: React.FC = () => {
  const [buttonState, setButtonState] = useState<ButtonState>(
    ButtonState.Primary
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const preDownloading = () => setButtonState(ButtonState.Loading);
  const postDownloading = () => setButtonState(ButtonState.Primary);

  const onErrorDownloadFile = () => {
    setButtonState(ButtonState.Primary);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const getFileName = () => {
    return DateTime.local().toISODate() + "_image-sample.png";
  };

  const downloadFile = () => {
    // throw new Error("uncomment this line to mock failure of API");
    return axios.get(
      "https://images.unsplash.com/photo-1652873171902-7eb117ecac17?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685",
      {
        responseType: "blob",
        /* 
        headers: {
          Authorization: "Bearer <token>", // add authentication information as required by the backend APIs.
        },
         */
      }
    );
  };

  const { ref, url, download, name } = useDownloadFile({
    apiDefinition: downloadFile,
    preDownloading,
    postDownloading,
    onError: onErrorDownloadFile,
    getFileName,
  });

  return (
    <Container className="mt-5">
      <Alert variant="danger" show={showAlert}>
        Something went wrong. Please try again!
      </Alert>
      <a href={url} download={name} className="hidden" ref={ref} />
      <Button label="Download" buttonState={buttonState} onClick={download} />
    </Container>
  );
};
