import React, { useEffect, useState } from "react";

function SnapshotViewer() {
  const [snapshotId, setSnapshotId] = useState(null);
  const [htmlFile, setHtmlFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);

  // Extract ?id=XXXX from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      setError("No snapshot ID provided. Use ?id=603807");
      return;
    }

    setSnapshotId(id);
  }, []);

  // Load snapshot when ID is available
  useEffect(() => {
    if (!snapshotId) return;

    const htmlPath = `${snapshotId}.html`;
    const jsonPath = `${snapshotId}.json`;

    // Try HTML first
    fetch(htmlPath)
      .then((res) => {
        if (res.ok) {
          setHtmlFile(htmlPath);
        } else {
          // fallback to JSON
          loadJson(jsonPath);
        }
      })
      .catch(() => loadJson(jsonPath));
  }, [snapshotId]);

  const loadJson = (jsonPath) => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => setJsonData(data))
      .catch(() =>
        setError(`Snapshot ${snapshotId} not found. Ensure ${jsonPath} or ${snapshotId}.html exists.`)
      );
  };

  return (
    <div className="snapshot-viewer">
      <h1>Snapshot Viewer</h1>

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!error && htmlFile && (
        <iframe
          src={htmlFile}
          title={`Snapshot ${snapshotId}`}
          className="snapshot-frame"
        />
      )}

      {!error && jsonData && (
        <pre className="snapshot-json">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default SnapshotViewer;
