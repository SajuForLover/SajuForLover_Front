/**
 * 기본 API 클라이언트 세팅
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  // FormData인 경우 브라우저가 자동으로 Content-Type(boundary 포함)을 설정하게 함
  if (!(options.body instanceof FormData)) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);
  }
  const data = await response.json();
  console.log(`API Response from ${endpoint}:`, data);
  return data;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    request<T>(endpoint, { ...options, method: "GET" }),
    
  post: <T>(endpoint: string, body: any, options?: RequestInit) => 
    request<T>(endpoint, { 
      ...options, 
      method: "POST", 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
    
  // 필요 시 put, delete 등 추가
};
