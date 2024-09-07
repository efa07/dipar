import React,{useEffect,useState} from "react"
import "./testresult.css"
import ScaleLoader from "react-spinners/ScaleLoader";

const TestResult: React.FC = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/lab_test_results");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: TestResult[] = await response.json();
        setTestResults(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTestResults();
  },[]);

  if(loading){
    return <div className="d-loader">Loading data...
    <ScaleLoader
        color="#22ffca"
        height={100}
        loading
        radius={1}
        width={9}
      />
    </div>;
  }
if (error) {
    return <div className="d-error">{error}</div>;
  }
  return (
    <div className="test">
        <div className="test-results">
            <h3>Test Results</h3>
            {testResults.map((test) => (
              
            <div className="test-result-item" key={test.id}>
              <p><strong>ID:</strong>{test.id}</p>
            <p><strong>Test:</strong> {test.test_name}</p>
            <p><strong>Result:</strong>{test.result}</p>
            <p><strong>Commnet:</strong> {test.comments}</p>
            </div>
            ))}
        </div>
    </div>
  )
}

export default TestResult
