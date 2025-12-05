const AWS = require("aws-sdk")

// DynamoDB 클라이언트 초기화
const dynamodb = new AWS.DynamoDB.DocumentClient()

// DynamoDB 테이블 이름 (환경 변수에서 가져오거나 기본값 사용)
const TABLE_NAME = process.env.DYNAMODB_TABLE || "UserData"

/**
 * AWS Lambda 핸들러 함수
 * DynamoDB에 데이터를 저장하는 예제
 */
exports.handler = async (event) => {
  // CORS 헤더 설정
  const headers = {
    "Access-Control-Allow-Origin": "*", // 프로덕션에서는 특정 도메인으로 제한
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  }

  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "OK" }),
    }
  }

  try {
    // 요청 본문 파싱
    let body
    if (typeof event.body === "string") {
      body = JSON.parse(event.body)
    } else {
      body = event.body
    }

    const { action, data } = body

    // 액션에 따른 처리
    switch (action) {
      case "saveData":
        return await saveToDynamoDB(data, headers)

      case "getData":
        return await getFromDynamoDB(data, headers)

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "Invalid action",
            message: `Unknown action: ${action}`,
          }),
        }
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    }
  }
}

/**
 * DynamoDB에 데이터 저장
 */
async function saveToDynamoDB(data, headers) {
  try {
    // 고유 ID 생성 (타임스탬프 + 랜덤 문자열)
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // DynamoDB에 저장할 아이템
    const item = {
      id,
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: data.timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    // DynamoDB에 저장
    const params = {
      TableName: TABLE_NAME,
      Item: item,
    }

    await dynamodb.put(params).promise()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Data saved successfully",
        data: item,
      }),
    }
  } catch (error) {
    console.error("Error saving to DynamoDB:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to save data",
        message: error.message,
      }),
    }
  }
}

/**
 * DynamoDB에서 데이터 조회
 */
async function getFromDynamoDB(data, headers) {
  try {
    const { id } = data

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Missing id parameter",
        }),
      }
    }

    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    }

    const result = await dynamodb.get(params).promise()

    if (!result.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: "Item not found",
        }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: result.Item,
      }),
    }
  } catch (error) {
    console.error("Error getting from DynamoDB:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to get data",
        message: error.message,
      }),
    }
  }
}

