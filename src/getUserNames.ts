import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

export const getUserNames = async (userIds: string[]) => {
  const dynamodb = new DynamoDBClient({});
  const ddb = DynamoDBDocumentClient.from(dynamodb);
  const names = [];
  for (const userId of userIds) {
    const result = await ddb.send(
      new GetCommand({
        TableName: "users",
        Key: {
          id: userId,
        },
      })
    );
    names.push(result.Item?.name);
  }
  return names;
};
