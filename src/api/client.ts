/**
 * 기본 API 클라이언트 세팅
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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

  const responseData = await response.json();

  if (!response.ok) {
    console.error("API Error:", responseData);
    throw new Error(`[${response.status}] ${responseData?.message || "API 요청 중 오류가 발생했습니다."}`);
  }

  console.log(`API Response from ${endpoint}:`, responseData);
  
  // 백엔드 TransformInterceptor에 의해 { success, status, data } 구조로 오는 경우 data만 반환
  if (responseData && typeof responseData === "object" && "success" in responseData && "data" in responseData) {
    return responseData.data;
  }
  
  return responseData;
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
