import * as React from "react"
import { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const DynamoDBData = ({ location }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Lambda 함수 엔드포인트 URL
  const LAMBDA_ENDPOINT = process.env.GATSBY_LAMBDA_ENDPOINT || "YOUR_LAMBDA_FUNCTION_URL"

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(LAMBDA_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getAllData",
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        setData(result.data || [])
      } else {
        throw new Error(result.error || "Failed to fetch data")
      }
    } catch (err) {
      setError(err.message)
      console.error("Error fetching data:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 없음"
    try {
      const date = new Date(dateString)
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  return (
    <Layout location={location} title="DynamoDB 데이터">
      <Seo title="DynamoDB Data" />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
        <h1>DynamoDB 저장 데이터</h1>
        <p style={{ marginBottom: "1rem" }}>
          DynamoDB에 저장된 모든 데이터를 확인할 수 있습니다.
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              backgroundColor: loading ? "#ccc" : "#007acc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "로딩 중..." : "새로고침"}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "4px",
              color: "#c00",
            }}
          >
            <strong>에러:</strong> {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>데이터를 불러오는 중...</p>
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            <p>저장된 데이터가 없습니다.</p>
            <p>
              <a href="/lambda-example/">여기</a>에서 데이터를 추가해보세요.
            </p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <p style={{ marginBottom: "1rem", color: "#666" }}>
              총 {data.length}개의 항목이 있습니다.
            </p>
            <div
              style={{
                display: "grid",
                gap: "1.5rem",
              }}
            >
              {data.map((item) => (
                <article
                  key={item.id}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <header
                    style={{
                      marginBottom: "1rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 0.5rem 0",
                        fontSize: "1.25rem",
                        color: "#333",
                      }}
                    >
                      {item.name || "이름 없음"}
                    </h3>
                    <div style={{ fontSize: "0.875rem", color: "#666" }}>
                      <div>
                        <strong>이메일:</strong> {item.email || "이메일 없음"}
                      </div>
                      <div style={{ marginTop: "0.25rem" }}>
                        <strong>작성일:</strong> {formatDate(item.timestamp || item.createdAt)}
                      </div>
                    </div>
                  </header>
                  <section>
                    <p
                      style={{
                        margin: 0,
                        lineHeight: "1.6",
                        color: "#444",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {item.message || "메시지 없음"}
                    </p>
                  </section>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DynamoDBData

