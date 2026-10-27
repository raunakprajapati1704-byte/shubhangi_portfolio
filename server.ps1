$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/")
try {
    $listener.Start()
} catch {}
Write-Host "Range-enabled video server listening on http://localhost:3000/"

$folder = $PSScriptRoot

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) { $path = "/index.html" }

        $relPath = $path.TrimStart('/')
        $filePath = Join-Path $folder $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".mp4"  { $response.ContentType = "video/mp4" }
                ".webm" { $response.ContentType = "video/webm" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                default { $response.ContentType = "application/octet-stream" }
            }

            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Accept-Ranges", "bytes")

            $fileInfo = New-Object System.IO.FileInfo($filePath)
            $totalLength = $fileInfo.Length

            $rangeHeader = $request.Headers["Range"]

            if ($rangeHeader -and $rangeHeader.StartsWith("bytes=")) {
                $range = $rangeHeader.Substring(6).Split('-')
                $start = [long]$range[0]
                $end = $totalLength - 1
                if ($range.Length -gt 1 -and ![string]::IsNullOrWhiteSpace($range[1])) {
                    $end = [long]$range[1]
                }
                if ($end -ge $totalLength) { $end = $totalLength - 1 }

                $contentLength = ($end - $start) + 1
                $response.StatusCode = 206
                $response.AddHeader("Content-Range", "bytes $start-$end/$totalLength")
                $response.ContentLength64 = $contentLength

                $fs = [System.IO.File]::OpenRead($filePath)
                try {
                    $fs.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null
                    $buffer = New-Object byte[] 65536
                    $bytesToRead = $contentLength
                    while ($bytesToRead -gt 0) {
                        $readSize = [Math]::Min($buffer.Length, $bytesToRead)
                        $bytesRead = $fs.Read($buffer, 0, $readSize)
                        if ($bytesRead -le 0) { break }
                        $response.OutputStream.Write($buffer, 0, $bytesRead)
                        $bytesToRead -= $bytesRead
                    }
                } catch {
                    # Client aborted stream
                } finally {
                    $fs.Close()
                }
            } else {
                $response.StatusCode = 200
                $response.ContentLength64 = $totalLength
                $fs = [System.IO.File]::OpenRead($filePath)
                try {
                    $buffer = New-Object byte[] 65536
                    while (($bytesRead = $fs.Read($buffer, 0, $buffer.Length)) -gt 0) {
                        $response.OutputStream.Write($buffer, 0, $bytesRead)
                    }
                } catch {
                    # Client aborted stream
                } finally {
                    $fs.Close()
                }
            }
        } else {
            $response.StatusCode = 404
        }
        try { $response.Close() } catch {}
    } catch {
        # Listener loop continues
    }
}
