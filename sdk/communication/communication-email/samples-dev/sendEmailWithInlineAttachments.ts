// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sends an email with an inline image attachment
 */

import type { EmailMessage } from "@azure/communication-email";
import { EmailClient } from "@azure/communication-email";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file (you will need to set these environment variables)
import "dotenv/config";

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";
const senderAddress = process.env["SENDER_ADDRESS"] || "";
const recipientAddress = process.env["RECIPIENT_ADDRESS"] || "";

const sendEmailWithAttachments = async (): Promise<void> => {
  // Create the Email Client
  const emailClient: EmailClient = new EmailClient(endpoint, new DefaultAzureCredential());

  // Create the Email Message to be sent
  const message: EmailMessage = {
    senderAddress: senderAddress,
    content: {
      subject: "This is the subject",
      plainText: "This is the body",
      html: '<html>This is the body<br /><img src="cid:inline_image" /></html>',
    },
    recipients: {
      to: [{ address: recipientAddress, displayName: "Customer Name" }],
    },
    attachments: [
      {
        name: "myinlineimage.jpg",
        contentType: "image/jpeg",
        contentInBase64: "ZW1haWwgdGVzdCBhdHRhY2htZW50",
        contentId: "inline_image",
      },
    ],
  };

  try {
    // Send the email message
    const poller = await emailClient.beginSend(message);
    const response = await poller.pollUntilDone();

    // Get the OperationId so that it can be used for tracking the message for troubleshooting
    console.log("Operation ID: " + response.id);
  } catch (error) {
    console.log(error);
  }
};

void sendEmailWithAttachments();
