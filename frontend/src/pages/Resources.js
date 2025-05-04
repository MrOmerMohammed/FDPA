import React from 'react';
import './Resources.css';
import { FaBookOpen, FaDatabase, FaCode, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';

const Resources = () => {
  // Dataset resources
  const datasets = [
    {
      name: 'FaceForensics++',
      description: 'Large-scale facial manipulation detection dataset with 1000+ manipulated videos using different facial manipulation methods.',
      link: 'https://github.com/ondyari/FaceForensics',
      type: 'Dataset'
    },
    {
      name: 'Kaggle Deepfake Detection Challenge',
      description: 'Dataset with thousands of videos created using various deepfake techniques.',
      link: 'https://www.kaggle.com/c/deepfake-detection-challenge/data',
      type: 'Dataset'
    },
    {
      name: 'ASVspoof',
      description: 'Audio dataset for detecting voice spoofing and synthetic speech.',
      link: 'https://www.asvspoof.org/',
      type: 'Dataset'
    }
  ];

  // Research papers
  const papers = [
    {
      title: 'FaceForensics++: Learning to Detect Manipulated Facial Images',
      authors: 'A. Rossler, D. Cozzolino, L. Verdoliva, C. Riess, J. Thies, M. Nießner',
      conference: 'IEEE ICCV, 2019',
      link: 'https://arxiv.org/abs/1901.08971',
      type: 'Paper'
    },
    {
      title: 'MesoNet: a Compact Facial Video Forgery Detection Network',
      authors: 'D. Afchar, V. Nozick, J. Yamagishi, I. Echizen',
      conference: 'IEEE WIFS, 2018',
      link: 'https://arxiv.org/abs/1809.00888',
      type: 'Paper'
    },
    {
      title: 'Detecting Deepfakes with Metric Learning',
      authors: 'S. McCloskey, M. Albright',
      conference: 'WACV, 2019',
      link: 'https://arxiv.org/abs/1909.02875',
      type: 'Paper'
    }
  ];

  // Tools and libraries
  const tools = [
    {
      name: 'TensorFlow',
      description: 'Open-source machine learning framework used for building and training neural networks.',
      link: 'https://www.tensorflow.org/',
      type: 'Library'
    },
    {
      name: 'OpenCV',
      description: 'Computer vision library that includes many image and video processing functions.',
      link: 'https://opencv.org/',
      type: 'Library'
    },
    {
      name: 'Librosa',
      description: 'Python package for music and audio analysis, used for audio deepfake detection.',
      link: 'https://librosa.org/',
      type: 'Library'
    },
    {
      name: 'Keras',
      description: 'High-level neural networks API that runs on top of TensorFlow.',
      link: 'https://keras.io/',
      type: 'Library'
    }
  ];

  // Educational content
  const educational = [
    {
      title: 'Deepfake Detection Tutorial',
      description: 'Step-by-step guide on building your own deepfake detector using CNNs.',
      link: '#',
      type: 'Tutorial'
    },
    {
      title: 'Understanding Deepfake Technology',
      description: 'Comprehensive guide to understanding how deepfakes work and detection methods.',
      link: '#',
      type: 'Guide'
    },
    {
      title: 'Audio Manipulation Detection',
      description: 'Learn how to detect synthetically generated or manipulated audio.',
      link: '#',
      type: 'Tutorial'
    }
  ];

  // Render a resource card
  const ResourceCard = ({ item }) => {
    let icon;
    switch (item.type) {
      case 'Dataset':
        icon = <FaDatabase />;
        break;
      case 'Paper':
        icon = <FaFilePdf />;
        break;
      case 'Library':
        icon = <FaCode />;
        break;
      default:
        icon = <FaBookOpen />;
    }

    return (
      <div className="resource-card">
        <div className="resource-icon">
          {icon}
        </div>
        <div className="resource-content">
          <h3 className="resource-title">
            {item.name || item.title}
          </h3>
          {item.authors && (
            <p className="resource-authors">{item.authors}</p>
          )}
          {item.conference && (
            <p className="resource-conference">{item.conference}</p>
          )}
          <p className="resource-description">
            {item.description}
          </p>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="resource-link">
            View Resource <FaExternalLinkAlt size={12} />
          </a>
        </div>
        <div className="resource-type">{item.type}</div>
      </div>
    );
  };

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1 className="resources-title">Resources</h1>
        <p className="resources-subtitle">
          Find datasets, research papers, tools, and educational content related to deepfake detection
        </p>
      </div>

      <div className="resources-section">
        <h2 className="section-title">Datasets</h2>
        <div className="resources-grid">
          {datasets.map((dataset, index) => (
            <ResourceCard key={`dataset-${index}`} item={dataset} />
          ))}
        </div>
      </div>

      <div className="resources-section">
        <h2 className="section-title">Research Papers</h2>
        <div className="resources-grid">
          {papers.map((paper, index) => (
            <ResourceCard key={`paper-${index}`} item={paper} />
          ))}
        </div>
      </div>

      <div className="resources-section">
        <h2 className="section-title">Tools & Libraries</h2>
        <div className="resources-grid">
          {tools.map((tool, index) => (
            <ResourceCard key={`tool-${index}`} item={tool} />
          ))}
        </div>
      </div>

      <div className="resources-section">
        <h2 className="section-title">Educational Content</h2>
        <div className="resources-grid">
          {educational.map((item, index) => (
            <ResourceCard key={`edu-${index}`} item={item} />
          ))}
        </div>
      </div>

      <div className="resources-section additional-resources">
        <h2 className="section-title">Additional Resources</h2>
        <p className="section-text">
          For more information on deepfake detection and to stay updated with the latest research, 
          check out these additional resources:
        </p>
        <ul className="additional-list">
          <li>
            <strong>IEEE Conferences on Computer Vision</strong> - Latest research in computer vision and deepfake detection
          </li>
          <li>
            <strong>arXiv.org Computer Vision and Pattern Recognition</strong> - Preprints of research papers
          </li>
          <li>
            <strong>Media Forensics Courses</strong> - University courses focusing on digital media forensics
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Resources;