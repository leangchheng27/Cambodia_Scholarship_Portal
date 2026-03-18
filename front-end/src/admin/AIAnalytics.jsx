import { useState, useEffect } from 'react';
import { getAIAnalytics } from './adminApi';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter
} from 'recharts';
import LoadingText from "../components/ui/LoadingText/LoadingText.jsx";
import './AIAnalytics.css';

const AIAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const result = await getAIAnalytics();

      if (result.success) {
        setAnalytics(result.data);
      } else {
        setError('Failed to load AI analytics');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err.response?.data?.error || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ai-analytics-loading">
        <LoadingText text="Loading AI analytics..." />
      </div>
    );
  }

  if (error) {
    return <div className="ai-analytics-error">{error}</div>;
  }

  if (!analytics) {
    return <div className="ai-analytics-error">No data available</div>;
  }

  // Transform feedback by action for pie chart
  const feedbackActionData = Object.entries(analytics.feedbackByAction).map(([action, count]) => ({
    name: action.charAt(0).toUpperCase() + action.slice(1),
    value: count,
  }));

  // Transform trends data for line chart
  const trendsData = analytics.feedbackTrends.reduce((acc, item) => {
    const existing = acc.find(d => d.date === item.date);
    if (existing) {
      existing[item.action] = item.count;
    } else {
      acc.push({
        date: item.date,
        [item.action]: item.count,
      });
    }
    return acc;
  }, []);

  // Transform top scholarships for bar chart
  const scholarshipData = (analytics.topScholarships || []).slice(0, 10).map(s => ({
    id: s.scholarshipId.substring(0, 15) + (s.scholarshipId.length > 15 ? '...' : ''),
    scholarshipId: s.scholarshipId,
    interactions: parseInt(s.interactions) || 0,
    popularity: parseFloat(s.popularity) || 0,
  }));

  // Transform scholarship type data
  const typeData = (analytics.scholarshipTypeBreakdown || []).map(t => ({
    name: t.scholarshipType || 'Unknown',
    count: parseInt(t.count) || 0,
    avgScore: parseFloat(t.avgScore) || 0,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

  return (
    <div className="ai-analytics-container">
      <h1>📊 AI Analytics & Insights</h1>
      <p className="ai-analytics-subtitle">
        Understanding how the AI recommendation system works through user engagement data
      </p>

      {/* Key Metrics Section */}
      <div className="ai-metrics-grid">
        <div className="metric-card ai-metric-primary">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>Total Feedback Records</h3>
            <p className="metric-value">{analytics.totalFeedback}</p>
            <span className="metric-desc">User interactions tracked</span>
          </div>
        </div>

        <div className="metric-card ai-metric-success">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <h3>Avg Recommendation Score</h3>
            <p className="metric-value">{analytics.recommendationQuality.avgScore.toFixed(2)}</p>
            <span className="metric-desc">Quality of AI matches</span>
          </div>
        </div>

        <div className="metric-card ai-metric-info">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>Click-Through Rate</h3>
            <p className="metric-value">{(analytics.recommendationQuality.engagementRate * 100).toFixed(1)}%</p>
            <span className="metric-desc">Users viewing recommendation details</span>
          </div>
        </div>

        <div className="metric-card ai-metric-warning">
          <div className="metric-icon">💾</div>
          <div className="metric-content">
            <h3>Save Rate</h3>
            <p className="metric-value">{(analytics.recommendationQuality.saveRate * 100).toFixed(1)}%</p>
            <span className="metric-desc">Users bookmarking recommendations</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="ai-charts-grid">
        {/* Feedback by Action - Pie Chart */}
        <div className="ai-chart-card">
          <h2>User Interaction Types</h2>
          <p className="chart-description">
            Shows how users interact with AI recommendations. Save = Interested, 
            Click = Viewed recommendation, View = Passive view, Dismiss = Not relevant
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feedbackActionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {feedbackActionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-insight">
            <p>💡 <strong>What this means:</strong> More saves and clicks indicate the AI is recommending 
              scholarships that users find relevant and interesting.</p>
          </div>
        </div>

        {/* User Engagement Trends */}
        <div className="ai-chart-card">
          <h2>Engagement Trends (7 Days)</h2>
          <p className="chart-description">
            Track how user interactions with AI recommendations change over time
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="view" stroke="#8884d8" connectNulls />
              <Line type="monotone" dataKey="click" stroke="#82ca9d" connectNulls />
              <Line type="monotone" dataKey="save" stroke="#ffc658" connectNulls />
              <Line type="monotone" dataKey="dismiss" stroke="#8dd1e1" connectNulls />
            </LineChart>
          </ResponsiveContainer>
          <div className="chart-insight">
            <p>💡 <strong>What this means:</strong> Spikes in "Save" indicate successful recommendations. 
              Rising "dismiss" may suggest recommendations need improvement.</p>
          </div>
        </div>

        {/* Top Scholarships by Engagement */}
        <div className="ai-chart-card">
          <h2>Top 10 Scholarships by Engagement</h2>
          <p className="chart-description">
            Most interacted scholarships show what's popular with users
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scholarshipData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="interactions" fill="#8884d8" name="Interactions" />
              <Bar yAxisId="right" dataKey="popularity" fill="#82ca9d" name="Popularity Score" />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-insight">
            <p>💡 <strong>What this means:</strong> This shows which scholarships users engage with most. 
              High engagement helps train the AI to recognize popular options.</p>
          </div>
        </div>

        {/* Scholarship Type Analysis */}
        <div className="ai-chart-card">
          <h2>Performance by Scholarship Type</h2>
          <p className="chart-description">
            How well the AI recommends different scholarship categories
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#ffc658" name="Total Interactions" />
              <Bar yAxisId="right" dataKey="avgScore" fill="#82ca9d" name="Avg Score" />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-insight">
            <p>💡 <strong>What this means:</strong> Average score shows quality of recommendations per type. 
              Different scholarship types may need different weighting in the AI model.</p>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="ai-insights-section">
        <h2>🤖 How the AI Works</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>1. Profile Analysis</h3>
            <p>
              When you provide your grades and student type, the AI analyzes:
              <ul>
                <li>Your <strong>GPA</strong> - overall academic performance</li>
                <li>Your <strong>strong subjects</strong> - areas where you excel</li>
                <li><strong>Recommended fields</strong> - study areas matching your profile</li>
              </ul>
            </p>
          </div>

          <div className="insight-card">
            <h3>2. Matching Algorithm</h3>
            <p>
              The AI uses semantic understanding to match you with scholarships:
              <ul>
                <li><strong>Field Matching</strong> - your strengths vs scholarship requirements</li>
                <li><strong>GPA Requirements</strong> - filtering by academic standards</li>
                <li><strong>Text Similarity</strong> - using AI embeddings to understand meaning</li>
              </ul>
            </p>
          </div>

          <div className="insight-card">
            <h3>3. Feedback Learning</h3>
            <p>
              The AI learns from your actions:
              <ul>
                <li><strong>Save</strong> (+3 points) - "I'm interested"</li>
                <li><strong>Click</strong> (+1 point) - "Worth looking at"</li>
                <li><strong>View</strong> (0 points) - "I saw this"</li>
                <li><strong>Dismiss</strong> (-1 point) - "Not what I need"</li>
              </ul>
            </p>
          </div>

          <div className="insight-card">
            <h3>4. Popularity Blending</h3>
            <p>
              The system combines two signals:
              <ul>
                <li><strong>AI Score</strong> - your personal match (80% weight)</li>
                <li><strong>Popularity</strong> - what others liked (20% weight)</li>
                <li>This prevents "echo chambers" while personalizing</li>
              </ul>
            </p>
          </div>

          <div className="insight-card">
            <h3>5. Training & Improvement</h3>
            <p>
              Your interactions help improve the AI:
              <ul>
                <li>Data collected in the system trains the AI model</li>
                <li>The embeddings model understands context better over time</li>
                <li>More user feedback = smarter recommendations</li>
              </ul>
            </p>
          </div>

          <div className="insight-card">
            <h3>6. Metrics & Performance</h3>
            <p>
              Key indicators the AI is working well:
              <ul>
                <li><strong>High Save Rate</strong> - users bookmark matches</li>
                <li><strong>High Click Rate</strong> - users view details</li>
                <li><strong>Low Dismiss Rate</strong> - few irrelevant suggestions</li>
                <li><strong>Stable Scores</strong> - consistent quality</li>
              </ul>
            </p>
          </div>
        </div>
      </div>

      {/* Data Insights */}
      {analytics.scoreDistribution && (
        <div className="ai-data-section">
          <h2>📊 Score Distribution</h2>
          <p className="section-description">
            Shows the range of scores assigned to scholarships (higher = better match)
          </p>
          <div className="score-distribution">
            {Object.entries(analytics.scoreDistribution).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])).map(([score, count]) => (
              <div key={score} className="score-bar">
                <span className="score-label">Score {score}</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${(count / Math.max(...Object.values(analytics.scoreDistribution))) * 100}%` }}
                  />
                </div>
                <span className="score-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="ai-actions">
        <button className="refresh-btn" onClick={fetchAnalytics}>
          🔄 Refresh Analytics
        </button>
      </div>
    </div>
  );
};

export default AIAnalytics;
