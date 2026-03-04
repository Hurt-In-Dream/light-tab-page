import axios from "@/plugins/axios"

export async function getBaiduSuggestion(keyword: string): Promise<string[]> {
  try {
    const { data } = await axios.get<string>("https://suggestion.baidu.com/su", {
      params: {
        p: 3,
        ie: "UTF-8",
        cb: "",
        wd: keyword
      },
      responseType: "text"
    })

    const find = /.*?s:(\[.*?\]).*?/
    const jsonText = find.exec(data)![1] ?? "[]"
    return JSON.parse(jsonText)
  } catch {
    return []
  }
}

export async function getBingSuggestion(keyword: string): Promise<string[]> {
  try {
    const { data } = await axios.get<any>("https://api.bing.com/qsonhs.aspx", {
      params: {
        type: "json",
        q: keyword
      }
    })

    return data["AS"]["Results"][0]["Suggests"].map(item => item["Txt"])
  } catch {
    return []
  }
}

export async function getGoogleSuggestion(keyword: string): Promise<string[]> {
  try {
    const { data } = await axios.get<string>("https://suggestqueries.google.com/complete/search", {
      params: {
        client: "gws-wiz",
        q: keyword,
        jsonp: ""
      },
      responseType: "text"
    })

    const find = /\["(.*?)"/g
    const suggestion: string[] = []

    let temp: any = null
    while ((temp = find.exec(data)) != null) {
      suggestion.push(temp[1])
    }

    return suggestion
  } catch {
    return []
  }
}

/**
 * 自定义搜索建议接口
 * URL 中使用 {keyword} 作为搜索词占位符
 * 支持返回 JSON 数组或包含数组的对象
 */
export async function getCustomSuggestion(keyword: string, apiUrl: string): Promise<string[]> {
  try {
    const url = apiUrl.replace(/\{keyword\}/g, encodeURIComponent(keyword))
    const { data } = await axios.get<any>(url, { responseType: "json" })

    // 如果返回值是数组
    if (Array.isArray(data)) {
      // 可能是 [keyword, [suggestions...]] 格式
      if (data.length >= 2 && Array.isArray(data[1])) {
        return data[1].map((item: any) => String(item))
      }
      return data.map((item: any) => (typeof item === "string" ? item : String(item)))
    }

    return []
  } catch {
    return []
  }
}
