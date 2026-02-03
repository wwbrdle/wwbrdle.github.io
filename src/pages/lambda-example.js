import * as React from "react"
import { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const LambdaExample = ({ location }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Lambda 함수 엔드포인트 URL (환경 변수 또는 직접 설정)
  const LAMBDA_ENDPOINT = process.env.GATSBY_LAMBDA_ENDPOINT || "YOUR_LAMBDA_FUNCTION_URL"

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Lambda 함수 호출
      const response = await fetch(LAMBDA_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "saveData", // Lambda에서 처리할 액션 타입
          data: {
            ...formData,
            timestamp: new Date().toISOString(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      setError(err.message)
      console.error("Error calling Lambda:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout location={location} title="Lambda & DynamoDB Example">
      <Seo title="Lambda Example" />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <h1>Lambda & DynamoDB 통합 예제</h1>
        <p>
          이 페이지는 AWS Lambda 함수를 호출하여 DynamoDB에 데이터를 저장하는
          예제입니다.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem" }}>
              이름:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>
              이메일:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="message" style={{ display: "block", marginBottom: "0.5rem" }}>
              메시지:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              backgroundColor: loading ? "#ccc" : "#007acc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "저장 중..." : "DynamoDB에 저장"}
          </button>
        </form>

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

        {result && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#efe",
              border: "1px solid #cfc",
              borderRadius: "4px",
              color: "#060",
            }}
          >
            <strong>성공!</strong>
            <pre style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default LambdaExample


