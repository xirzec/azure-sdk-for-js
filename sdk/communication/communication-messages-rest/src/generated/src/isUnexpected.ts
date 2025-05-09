// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetMedia200Response,
  GetMediaDefaultResponse,
  Send202Response,
  SendDefaultResponse,
  ListTemplates200Response,
  ListTemplatesDefaultResponse,
  AddParticipants207Response,
  AddParticipantsDefaultResponse,
  RemoveParticipants207Response,
  RemoveParticipantsDefaultResponse,
  ListConversations200Response,
  ListConversationsDefaultResponse,
  CreateConversation201Response,
  CreateConversationDefaultResponse,
  ListMessages200Response,
  ListMessagesDefaultResponse,
  SendMessage200Response,
  SendMessageDefaultResponse,
  AnalyzeConversation200Response,
  AnalyzeConversationDefaultResponse,
  GetConversation200Response,
  GetConversationDefaultResponse,
  DeleteConversation204Response,
  DeleteConversationDefaultResponse,
  TerminateConversation200Response,
  TerminateConversationDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /messages/streams/{id}": ["200"],
  "POST /messages/notifications:send": ["202"],
  "GET /messages/channels/{channelId}/templates": ["200"],
  "POST /messages/conversations/{conversationId}/participants:add": ["207"],
  "POST /messages/conversations/{conversationId}/participants:remove": ["207"],
  "GET /messages/conversations": ["200"],
  "POST /messages/conversations": ["201"],
  "GET /messages/conversations/{conversationId}/messages": ["200"],
  "POST /messages/conversations/{conversationId}/messages:send": ["200"],
  "POST /messages/conversations/{conversationId}:analyze": ["200"],
  "GET /messages/conversations/{conversationId}": ["200"],
  "DELETE /messages/conversations/{conversationId}": ["204"],
  "POST /messages/conversations/{conversationId}:terminate": ["200"],
};

export function isUnexpected(
  response: GetMedia200Response | GetMediaDefaultResponse,
): response is GetMediaDefaultResponse;
export function isUnexpected(
  response: Send202Response | SendDefaultResponse,
): response is SendDefaultResponse;
export function isUnexpected(
  response: ListTemplates200Response | ListTemplatesDefaultResponse,
): response is ListTemplatesDefaultResponse;
export function isUnexpected(
  response: AddParticipants207Response | AddParticipantsDefaultResponse,
): response is AddParticipantsDefaultResponse;
export function isUnexpected(
  response: RemoveParticipants207Response | RemoveParticipantsDefaultResponse,
): response is RemoveParticipantsDefaultResponse;
export function isUnexpected(
  response: ListConversations200Response | ListConversationsDefaultResponse,
): response is ListConversationsDefaultResponse;
export function isUnexpected(
  response: CreateConversation201Response | CreateConversationDefaultResponse,
): response is CreateConversationDefaultResponse;
export function isUnexpected(
  response: ListMessages200Response | ListMessagesDefaultResponse,
): response is ListMessagesDefaultResponse;
export function isUnexpected(
  response: SendMessage200Response | SendMessageDefaultResponse,
): response is SendMessageDefaultResponse;
export function isUnexpected(
  response: AnalyzeConversation200Response | AnalyzeConversationDefaultResponse,
): response is AnalyzeConversationDefaultResponse;
export function isUnexpected(
  response: GetConversation200Response | GetConversationDefaultResponse,
): response is GetConversationDefaultResponse;
export function isUnexpected(
  response: DeleteConversation204Response | DeleteConversationDefaultResponse,
): response is DeleteConversationDefaultResponse;
export function isUnexpected(
  response:
    | TerminateConversation200Response
    | TerminateConversationDefaultResponse,
): response is TerminateConversationDefaultResponse;
export function isUnexpected(
  response:
    | GetMedia200Response
    | GetMediaDefaultResponse
    | Send202Response
    | SendDefaultResponse
    | ListTemplates200Response
    | ListTemplatesDefaultResponse
    | AddParticipants207Response
    | AddParticipantsDefaultResponse
    | RemoveParticipants207Response
    | RemoveParticipantsDefaultResponse
    | ListConversations200Response
    | ListConversationsDefaultResponse
    | CreateConversation201Response
    | CreateConversationDefaultResponse
    | ListMessages200Response
    | ListMessagesDefaultResponse
    | SendMessage200Response
    | SendMessageDefaultResponse
    | AnalyzeConversation200Response
    | AnalyzeConversationDefaultResponse
    | GetConversation200Response
    | GetConversationDefaultResponse
    | DeleteConversation204Response
    | DeleteConversationDefaultResponse
    | TerminateConversation200Response
    | TerminateConversationDefaultResponse,
): response is
  | GetMediaDefaultResponse
  | SendDefaultResponse
  | ListTemplatesDefaultResponse
  | AddParticipantsDefaultResponse
  | RemoveParticipantsDefaultResponse
  | ListConversationsDefaultResponse
  | CreateConversationDefaultResponse
  | ListMessagesDefaultResponse
  | SendMessageDefaultResponse
  | AnalyzeConversationDefaultResponse
  | GetConversationDefaultResponse
  | DeleteConversationDefaultResponse
  | TerminateConversationDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
