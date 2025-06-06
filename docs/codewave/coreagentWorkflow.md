# 工作流接口


## 执行 workflow
```text
POST/workflows/run
```

执行 workflow，没有已发布的 workflow，不可执行。

### Request Body

+   `inputs` (object) Required 允许传入 App 定义的各变量值。 inputs 参数包含了多组键值对（Key/Value pairs），每组的键对应一个特定变量，每组的值则是该变量的具体值。变量可以是文件列表类型。 文件列表类型变量适用于传入文件结合文本理解并回答问题，仅当模型支持该类型文件解析能力时可用。如果该变量是文件列表类型，该变量对应的值应是列表格式，其中每个元素应包含以下内容：
    +   `type` (string) 支持类型：
        +   `document` 具体类型包含：'TXT', 'MD', 'MARKDOWN', 'PDF', 'HTML', 'XLSX', 'XLS', 'DOCX', 'CSV', 'EML', 'MSG', 'PPTX', 'PPT', 'XML', 'EPUB'
        +   `image` 具体类型包含：'JPG', 'JPEG', 'PNG', 'GIF', 'WEBP', 'SVG'
        +   `audio` 具体类型包含：'MP3', 'M4A', 'WAV', 'WEBM', 'AMR'
        +   `video` 具体类型包含：'MP4', 'MOV', 'MPEG', 'MPGA'
        +   `custom` 具体类型包含：其他文件类型
    +   `transfer_method` (string) 传递方式，`remote_url` 图片地址 / `local_file` 上传文件
    +   `url` (string) 图片地址（仅当传递方式为 `remote_url` 时）
    +   `upload_file_id` (string) (string) 上传文件 ID（仅当传递方式为 `local_file` 时）
+   `response_mode` (string) Required 返回响应模式，支持：
    +   `streaming` 流式模式（推荐）。基于 SSE（**[Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)**）实现类似打字机输出方式的流式返回。
    +   `blocking` 阻塞模式，等待执行完毕后返回结果。（请求若流程较长可能会被中断）。 *由于 Cloudflare 限制，请求会在 100 秒超时无返回后中断。*
+   `user` (string) Required 用户标识，用于定义终端用户的身份，方便检索、统计。 由开发者定义规则，需保证用户标识在应用内唯一。

### Response

当 `response_mode` 为 `blocking` 时，返回 CompletionResponse object。 当 `response_mode` 为 `streaming`时，返回 ChunkCompletionResponse object 流式序列。

### CompletionResponse

返回完整的 App 结果，`Content-Type` 为 `application/json` 。

+   `workflow_run_id` (string) workflow 执行 ID
+   `task_id` (string) 任务 ID，用于请求跟踪和下方的停止响应接口
+   `data` (object) 详细内容
    +   `id` (string) workflow 执行 ID
    +   `workflow_id` (string) 关联 Workflow ID
    +   `status` (string) 执行状态, `running` / `succeeded` / `failed` / `stopped`
    +   `outputs` (json) Optional 输出内容
    +   `error` (string) Optional 错误原因
    +   `elapsed_time` (float) Optional 耗时(s)
    +   `total_tokens` (int) Optional 总使用 tokens
    +   `total_steps` (int) 总步数（冗余），默认 0
    +   `created_at` (timestamp) 开始时间
    +   `finished_at` (timestamp) 结束时间

### ChunkCompletionResponse

返回 App 输出的流式块，`Content-Type` 为 `text/event-stream`。 每个流式块均为 data: 开头，块之间以 `\n\n` 即两个换行符分隔，如下所示：

```text
data: {"event": "message", "task_id": "900bbd43-dc0b-4383-a372-aa6e6c414227", "id": "663c5084-a254-4040-8ad3-51f2a3c1a77c", "answer": "Hi", "created_at": 1705398420}\n\n
```

 

流式块中根据 `event` 不同，结构也不同，包含以下类型：

+   `event: workflow_started` workflow 开始执行
    +   `task_id` (string) 任务 ID，用于请求跟踪和下方的停止响应接口
    +   `workflow_run_id` (string) workflow 执行 ID
    +   `event` (string) 固定为 `workflow_started`
    +   `data` (object) 详细内容
        +   `id` (string) workflow 执行 ID
        +   `workflow_id` (string) 关联 Workflow ID
        +   `sequence_number` (int) 自增序号，App 内自增，从 1 开始
        +   `created_at` (timestamp) 开始时间
+   `event: node_started` node 开始执行
    +   `task_id` (string) 任务 ID，用于请求跟踪和下方的停止响应接口
    +   `workflow_run_id` (string) workflow 执行 ID
    +   `event` (string) 固定为 `node_started`
    +   `data` (object) 详细内容
        +   `id` (string) workflow 执行 ID
        +   `node_id` (string) 节点 ID
        +   `node_type` (string) 节点类型
        +   `title` (string) 节点名称
        +   `index` (int) 执行序号，用于展示 Tracing Node 顺序
        +   `predecessor_node_id` (string) 前置节点 ID，用于画布展示执行路径
        +   `inputs` (object) 节点中所有使用到的前置节点变量内容
        +   `created_at` (timestamp) 开始时间
+   `event: node_finished` node 执行结束，成功失败同一事件中不同状态
    +   `task_id` (string) 任务 ID，用于请求跟踪和下方的停止响应接口
    +   `workflow_run_id` (string) workflow 执行 ID
    +   `event` (string) 固定为 `node_finished`
    +   `data` (object) 详细内容
        +   `id` (string) node 执行 ID
        +   `node_id` (string) 节点 ID
        +   `index` (int) 执行序号，用于展示 Tracing Node 顺序
        +   `predecessor_node_id` (string) optional 前置节点 ID，用于画布展示执行路径
        +   `inputs` (object) 节点中所有使用到的前置节点变量内容
        +   `process_data` (json) Optional 节点过程数据
        +   `outputs` (json) Optional 输出内容
        +   `status` (string) 执行状态 `running` / `succeeded` / `failed` / `stopped`
        +   `error` (string) Optional 错误原因
        +   `elapsed_time` (float) Optional 耗时(s)
        +   `execution_metadata` (json) 元数据
            +   `total_tokens` (int) optional 总使用 tokens
            +   `total_price` (decimal) optional 总费用
            +   `currency` (string) optional 货币，如 `USD` / `RMB`
        +   `created_at` (timestamp) 开始时间
+   `event: workflow_finished` workflow 执行结束，成功失败同一事件中不同状态
    +   `task_id` (string) 任务 ID，用于请求跟踪和下方的停止响应接口
    +   `workflow_run_id` (string) workflow 执行 ID
    +   `event` (string) 固定为 `workflow_finished`
    +   `data` (object) 详细内容
        +   `id` (string) workflow 执行 ID
        +   `workflow_id` (string) 关联 Workflow ID
        +   `status` (string) 执行状态 `running` / `succeeded` / `failed` / `stopped`
        +   `outputs` (json) Optional 输出内容
        +   `error` (string) Optional 错误原因
        +   `elapsed_time` (float) Optional 耗时(s)
        +   `total_tokens` (int) Optional 总使用 tokens
        +   `total_steps` (int) 总步数（冗余），默认 0
        +   `created_at` (timestamp) 开始时间
        +   `finished_at` (timestamp) 结束时间
+   `event: tts_message` TTS 音频流事件，即：语音合成输出。内容是Mp3格式的音频块，使用 base64 编码后的字符串，播放的时候直接解码即可。(开启自动播放才有此消息)
    +   `task_id` (string) 任务 ID，用于请求跟踪和下方的停止响应接口
    +   `message_id` (string) 消息唯一 ID
    +   `audio` (string) 语音合成之后的音频块使用 Base64 编码之后的文本内容，播放的时候直接 base64 解码送入播放器即可
    +   `created_at` (int) 创建时间戳，如：1705395332
+   `event: tts_message_end` TTS 音频流结束事件，收到这个事件表示音频流返回结束。
    +   `task_id` (string) 任务 ID，用于请求跟踪和下方的停止响应接口
    +   `message_id` (string) 消息唯一 ID
    +   `audio` (string) 结束事件是没有音频的，所以这里是空字符串
    +   `created_at` (int) 创建时间戳，如：1705395332
+   `event: ping` 每 10s 一次的 ping 事件，保持连接存活。

### Errors

+   400，`invalid_param`，传入参数异常
+   400，`app_unavailable`，App 配置不可用
+   400，`provider_not_initialize`，无可用模型凭据配置
+   400，`provider_quota_exceeded`，模型调用额度不足
+   400，`model_currently_not_support`，当前模型不可用
+   400，`workflow_request_error`，workflow 执行失败
+   500，服务内部异常

```Request
POST /workflows/run
```
```text
curl -X POST 'https://coreagent.codewave.163.com/v1/workflows/run' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "response_mode": "streaming",
    "user": "abc-123"
}'
```
 ```Example

{
  "inputs": {
    "{variable_name}": 
    [
      {
      "transfer_method": "local_file",
      "upload_file_id": "{upload_file_id}",
      "type": "{document_type}"
      }
    ]
  }
}
```

 

### Blocking Mode
```Response

{
    "workflow_run_id": "djflajgkldjgd",
    "task_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "data": {
        "id": "fdlsjfjejkghjda",
        "workflow_id": "fldjaslkfjlsda",
        "status": "succeeded",
        "outputs": {
          "text": "Nice to meet you."
        },
        "error": null,
        "elapsed_time": 0.875,
        "total_tokens": 3562,
        "total_steps": 8,
        "created_at": 1705407629,
        "finished_at": 1727807631
    }
}
```

 

### Streaming Mode

```Response

  data: {"event": "workflow_started", "task_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "workflow_run_id": "5ad498-f0c7-4085-b384-88cbe6290", "data": {"id": "5ad498-f0c7-4085-b384-88cbe6290", "workflow_id": "dfjasklfjdslag", "sequence_number": 1, "created_at": 1679586595}}
  data: {"event": "node_started", "task_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "workflow_run_id": "5ad498-f0c7-4085-b384-88cbe6290", "data": {"id": "5ad498-f0c7-4085-b384-88cbe6290", "node_id": "dfjasklfjdslag", "node_type": "start", "title": "Start", "index": 0, "predecessor_node_id": "fdljewklfklgejlglsd", "inputs": {}, "created_at": 1679586595}}
  data: {"event": "node_finished", "task_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "workflow_run_id": "5ad498-f0c7-4085-b384-88cbe6290", "data": {"id": "5ad498-f0c7-4085-b384-88cbe6290", "node_id": "dfjasklfjdslag", "node_type": "start", "title": "Start", "index": 0, "predecessor_node_id": "fdljewklfklgejlglsd", "inputs": {}, "outputs": {}, "status": "succeeded", "elapsed_time": 0.324, "execution_metadata": {"total_tokens": 63127864, "total_price": 2.378, "currency": "USD"},  "created_at": 1679586595}}
  data: {"event": "workflow_finished", "task_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "workflow_run_id": "5ad498-f0c7-4085-b384-88cbe6290", "data": {"id": "5ad498-f0c7-4085-b384-88cbe6290", "workflow_id": "dfjasklfjdslag", "outputs": {}, "status": "succeeded", "elapsed_time": 0.324, "total_tokens": 63127864, "total_steps": "1", "created_at": 1679586595, "finished_at": 1679976595}}
  data: {"event": "tts_message", "conversation_id": "23dd85f3-1a41-4ea0-b7a9-062734ccfaf9", "message_id": "a8bdc41c-13b2-4c18-bfd9-054b9803038c", "created_at": 1721205487, "task_id": "3bf8a0bb-e73b-4690-9e66-4e429bad8ee7", "audio": "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"}
  data: {"event": "tts_message_end", "conversation_id": "23dd85f3-1a41-4ea0-b7a9-062734ccfaf9", "message_id": "a8bdc41c-13b2-4c18-bfd9-054b9803038c", "created_at": 1721205487, "task_id": "3bf8a0bb-e73b-4690-9e66-4e429bad8ee7", "audio": ""}
```

 

```text
File upload sample code
```

```text
import requests
import json

def upload_file(file_path, user):
    upload_url = "https://api.dify.ai/v1/files/upload"
    headers = {
        "Authorization": "Bearer app-xxxxxxxx",
    }
    
    try:
        print("上传文件中...")
        with open(file_path, 'rb') as file:
            files = {
                'file': (file_path, file, 'text/plain')  # 确保文件以适当的MIME类型上传
            }
            data = {
                "user": user,
                "type": "TXT"  # 设置文件类型为TXT
            }
            
            response = requests.post(upload_url, headers=headers, files=files, data=data)
            if response.status_code == 201:  # 201 表示创建成功
                print("文件上传成功")
                return response.json().get("id")  # 获取上传的文件 ID
            else:
                print(f"文件上传失败，状态码: {response.status_code}")
                return None
    except Exception as e:
        print(f"发生错误: {str(e)}")
        return None

def run_workflow(file_id, user, response_mode="blocking"):
    workflow_url = "https://api.dify.ai/v1/workflows/run"
    headers = {
        "Authorization": "Bearer app-xxxxxxxxx",
        "Content-Type": "application/json"
    }

    data = {
        "inputs": {
            "orig_mail": [{
                "transfer_method": "local_file",
                "upload_file_id": file_id,
                "type": "document"
            }]
        },
        "response_mode": response_mode,
        "user": user
    }

    try:
        print("运行工作流...")
        response = requests.post(workflow_url, headers=headers, json=data)
        if response.status_code == 200:
            print("工作流执行成功")
            return response.json()
        else:
            print(f"工作流执行失败，状态码: {response.status_code}")
            return {"status": "error", "message": f"Failed to execute workflow, status code: {response.status_code}"}
    except Exception as e:
        print(f"发生错误: {str(e)}")
        return {"status": "error", "message": str(e)}

# 使用示例
file_path = "{your_file_path}"
user = "difyuser"

# 上传文件
file_id = upload_file(file_path, user)
if file_id:
    # 文件上传成功，继续运行工作流
    result = run_workflow(file_id, user)
    print(result)
else:
    print("文件上传失败，无法执行工作流")
```


## 获取workflow执行情况

```text
GET /workflows/run/:workflow_id
```
根据 workflow 执行 ID 获取 workflow 任务当前执行结果

### Path

+   `workflow_id` (string) workflow 执行 ID，可在流式返回 Chunk 中获取

### Response

+   `id` (string) workflow 执行 ID
+   `workflow_id` (string) 关联的 Workflow ID
+   `status` (string) 执行状态 `running` / `succeeded` / `failed` / `stopped`
+   `inputs` (json) 任务输入内容
+   `outputs` (json) 任务输出内容
+   `error` (string) 错误原因
+   `total_steps` (int) 任务执行总步数
+   `total_tokens` (int) 任务执行总 tokens
+   `created_at` (timestamp) 任务开始时间
+   `finished_at` (timestamp) 任务结束时间
+   `elapsed_time` (float) 耗时(s)

### Example

```Request

GET /workflows/run/:workflow_id


curl -X GET 'https://coreagent.codewave.163.com/v1/workflows/run/:workflow_id' \
-H 'Authorization: Bearer {api_key}' \
-H 'Content-Type: application/json'
```

```Response

{
    "id": "b1ad3277-089e-42c6-9dff-6820d94fbc76",
    "workflow_id": "19eff89f-ec03-4f75-b0fc-897e7effea02",
    "status": "succeeded",
    "inputs": "{\"sys.files\": [], \"sys.user_id\": \"abc-123\"}",
    "outputs": null,
    "error": null,
    "total_steps": 3,
    "total_tokens": 0,
    "created_at": "Thu, 18 Jul 2024 03:17:40 -0000",
    "finished_at": "Thu, 18 Jul 2024 03:18:10 -0000",
    "elapsed_time": 30.098514399956912
}
```





## 停止响应

```text
POST /workflows/tasks/:task_id/stop
```

仅支持流式模式。

### Path

+   `task_id` (string) 任务 ID，可在流式返回 Chunk 中获取

### Request Body

+   `user` (string) Required 用户标识，用于定义终端用户的身份，必须和发送消息接口传入 user 保持一致。

### Response

+   `result` (string) 固定返回 "success"

### Example

```Request

POST /workflows/tasks/:task\_id/stop

curl -X POST 'https://coreagent.codewave.163.com/v1/workflows/tasks/:task_id/stop' \
-H 'Authorization: Bearer {api_key}' \
-H 'Content-Type: application/json' \
--data-raw '{"user": "abc-123"}'
```


```Response
{
  "result": "success"
}
```




## 上传文件

```text
POST/files/upload
```

上传文件并在发送消息时使用，可实现图文多模态理解。 支持您的工作流程所支持的任何格式。 *上传的文件仅供当前终端用户使用。*

### Request Body

该接口需使用 `multipart/form-data` 进行请求。

+   Name
    
    `file`
    
    Type
    
    file
    
    Description
    
    要上传的文件。
    
+   Name
    
    `user`
    
    Type
    
    string
    
    Description
    
    用户标识，用于定义终端用户的身份，必须和发送消息接口传入 user 保持一致。
    

### Response

成功上传后，服务器会返回文件的 ID 和相关信息。

+   `id` (uuid) ID
+   `name` (string) 文件名
+   `size` (int) 文件大小（byte）
+   `extension` (string) 文件后缀
+   `mime_type` (string) 文件 mime-type
+   `created_by` (uuid) 上传人 ID
+   `created_at` (timestamp) 上传时间

### Errors

+   400，`no_file_uploaded`，必须提供文件
+   400，`too_many_files`，目前只接受一个文件
+   400，`unsupported_preview`，该文件不支持预览
+   400，`unsupported_estimate`，该文件不支持估算
+   413，`file_too_large`，文件太大
+   415，`unsupported_file_type`，不支持的扩展名，当前只接受文档类文件
+   503，`s3_connection_failed`，无法连接到 S3 服务
+   503，`s3_permission_denied`，无权限上传文件到 S3
+   503，`s3_file_too_large`，文件超出 S3 大小限制

### Example

``` Request

POST /files/upload

curl -X POST 'https://coreagent.codewave.163.com/v1/files/upload' \
--header 'Authorization: Bearer {api_key}' \
--form 'file=@localfile;type=image/[png|jpeg|jpg|webp|gif] \
--form 'user=abc-123'
```

 

``` Response

{
  "id": "72fa9618-8f89-4a37-9b33-7e1178a24a67",
  "name": "example.png",
  "size": 1024,
  "extension": "png",
  "mime_type": "image/png",
  "created_by": 123,
  "created_at": 1577836800,
}
```

 





## 获取 workflow 日志

```text
GET /workflows/logs
```

倒序返回workflow日志

### Query

| 名称       | 字段名    | 类型   | 描述                                                                 |
|------------|-----------|--------|----------------------------------------------------------------------|
| 关键字     | `keyword` | string | 关键字                                                               |
| 执行状态   | `status`  | string | 执行状态，取值为 succeeded/failed/stopped                           |
| 当前页码   | `page`    | int    | 当前页码，默认值为 1                                                |
| 每页条数   | `limit`   | int    | 每页条数，默认值为 20                                              |

### Response
+   `page` (int) 当前页码
+   `limit` (int) 每页条数
+   `total` (int) 总条数
+   `has_more` (bool) 是否还有更多数据
+   `data` (array\[object\]) 当前页码的数据
    +   `id` (string) 标识
    +   `workflow_run` (object) Workflow 执行日志
        +   `id` (string) 标识
        +   `version` (string) 版本
        +   `status` (string) 执行状态, `running` / `succeeded` / `failed` / `stopped`
        +   `error` (string) (可选) 错误
        +   `elapsed_time` (float) 耗时，单位秒
        +   `total_tokens` (int) 消耗的token数量
        +   `total_steps` (int) 执行步骤长度
        +   `created_at` (timestamp) 开始时间
        +   `finished_at` (timestamp) 结束时间
    +   `created_from` (string) 来源
    +   `created_by_role` (string) 角色
    +   `created_by_account` (string) (可选) 帐号
    +   `created_by_end_user` (object) 用户
        +   `id` (string) 标识
        +   `type` (string) 类型
        +   `is_anonymous` (bool) 是否匿名
        +   `session_id` (string) 会话标识
    +   `created_at` (timestamp) 创建时间

### Example
```Request
GET /workflows/logs

curl -X GET 'https://coreagent.codewave.163.com/v1/workflows/logs'\
 --header 'Authorization: Bearer {api_key}'
```

``` Response

{
    "page": 1,
    "limit": 1,
    "total": 7,
    "has_more": true,
    "data": [
        {
            "id": "e41b93f1-7ca2-40fd-b3a8-999aeb499cc0",
            "workflow_run": {
                "id": "c0640fc8-03ef-4481-a96c-8a13b732a36e",
                "version": "2024-08-01 12:17:09.771832",
                "status": "succeeded",
                "error": null,
                "elapsed_time": 1.3588523610014818,
                "total_tokens": 0,
                "total_steps": 3,
                "created_at": 1726139643,
                "finished_at": 1726139644
            },
            "created_from": "service-api",
            "created_by_role": "end_user",
            "created_by_account": null,
            "created_by_end_user": {
                "id": "7f7d9117-dd9d-441d-8970-87e5e7e687a3",
                "type": "service_api",
                "is_anonymous": false,
                "session_id": "abc-123"
            },
            "created_at": 1726139644
        }
    ]
}
```




## 获取应用基本信息
```text
GET /info
```
用于获取应用的基本信息

### Response

+   `name` (string) 应用名称
+   `description` (string) 应用描述
+   `tags` (array\[string\]) 应用标签

### Example
```Request
GET /info

curl -X GET 'https://coreagent.codewave.163.com/v1/info' \
-H 'Authorization: Bearer {api_key}'
```
```Response
{
  "name": "My App",
  "description": "This is my app.",
  "tags": [
    "tag1",
    "tag2"
  ]
}
```



## 获取应用参数
```text
GET/parameters
```
用于进入页面一开始，获取功能开关、输入参数名称、类型及默认值等使用。

### Response

+   `user_input_form` (array\[object\]) 用户输入表单配置
    +   `text-input` (object) 文本输入控件
        +   `label` (string) 控件展示标签名
        +   `variable` (string) 控件 ID
        +   `required` (bool) 是否必填
        +   `default` (string) 默认值
    +   `paragraph` (object) 段落文本输入控件
        +   `label` (string) 控件展示标签名
        +   `variable` (string) 控件 ID
        +   `required` (bool) 是否必填
        +   `default` (string) 默认值
    +   `select` (object) 下拉控件
        +   `label` (string) 控件展示标签名
        +   `variable` (string) 控件 ID
        +   `required` (bool) 是否必填
        +   `default` (string) 默认值
        +   `options` (array\[string\]) 选项值
+   `file_upload` (object) 文件上传配置
    +   `image` (object) 图片设置 当前仅支持图片类型：`png`, `jpg`, `jpeg`, `webp`, `gif`
        +   `enabled` (bool) 是否开启
        +   `number_limits` (int) 图片数量限制，默认 3
        +   `transfer_methods` (array\[string\]) 传递方式列表，remote\_url , local\_file，必选一个
+   `system_parameters` (object) 系统参数
    +   `file_size_limit` (int) 文档上传大小限制 (MB)
    +   `image_file_size_limit` (int) 图片文件上传大小限制（MB）
    +   `audio_file_size_limit` (int) 音频文件上传大小限制 (MB)
    +   `video_file_size_limit` (int) 视频文件上传大小限制 (MB)

### Example
```Request
GET /parameters

 curl -X GET 'https://coreagent.codewave.163.com/v1/parameters'
``` 

```Response

{
  "user_input_form": [
      {
          "paragraph": {
              "label": "Query",
              "variable": "query",
              "required": true,
              "default": ""
          }
      }
  ],
  "file_upload": {
      "image": {
          "enabled": false,
          "number_limits": 3,
          "detail": "high",
          "transfer_methods": [
              "remote_url",
              "local_file"
          ]
      }
  },
  "system_parameters": {
      "file_size_limit": 15,
      "image_file_size_limit": 10,
      "audio_file_size_limit": 50,
      "video_file_size_limit": 100
  }
}
```