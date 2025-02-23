// // Course recommendations database - stores all possible course recommendations
// const courseRecommendations = {
//     emotionalWellbeing: [
//         {
//             title: "Understanding and Managing Emotions",
//             description: "Learn essential techniques for emotional regulation and mindfulness. This course helps you develop better emotional awareness and control.",
//             url: "/courses/emotional-management",
//             forScores: [1, 2],
//             keyTopics: ["Emotional awareness", "Stress management", "Mindfulness techniques"]
//         },
//         {
//             title: "Advanced Emotional Intelligence",
//             description: "Build upon your emotional intelligence skills with advanced concepts and practices.",
//             url: "/courses/emotional-intelligence",
//             forScores: [3, 4, 5],
//             keyTopics: ["Advanced EQ", "Leadership", "Emotional resilience"]
//         }
//     ],  
//     relationships: [
//         {
//             title: "Building Healthy Relationships",
//             description: "Learn fundamental skills for creating and maintaining healthy relationships. Focus on communication and boundary-setting.",
//             url: "/courses/relationship-basics",
//             forScores: [1, 2],
//             keyTopics: ["Communication skills", "Boundary setting", "Trust building"]
//         },
//         {
//             title: "Relationship Enhancement",
//             description: "Take your relationships to the next level with advanced communication and conflict resolution skills.",
//             url: "/courses/relationships-advanced",
//             forScores: [3, 4],
//             keyTopics: ["Conflict resolution", "Deep listening", "Emotional intimacy"]
//         }
//     ],
//     selfEsteem: [
//         {
//             title: "Building Self-Confidence",
//             description: "Develop core self-esteem and confidence through proven psychological techniques.",
//             url: "/courses/self-confidence",
//             forScores: [1, 2],
//             keyTopics: ["Self-worth", "Positive self-talk", "Confidence building"]
//         },
//         {
//             title: "Advanced Personal Growth",
//             description: "Further develop your self-esteem and personal growth journey.",
//             url: "/courses/personal-growth",
//             forScores: [3, 4],
//             keyTopics: ["Personal development", "Goal achievement", "Identity work"]
//         }
//     ],
//     copingMechanisms: [
//         {
//             title: "Healthy Coping Strategies",
//             description: "Learn effective ways to handle stress and life challenges. Develop a toolkit of healthy coping mechanisms.",
//             url: "/courses/coping-basics",
//             forScores: [1, 2],
//             keyTopics: ["Stress management", "Healthy habits", "Emotional regulation"]
//         },
//         {
//             title: "Advanced Stress Management",
//             description: "Master advanced techniques for managing stress and building resilience.",
//             url: "/courses/stress-advanced",
//             forScores: [3, 4],
//             keyTopics: ["Resilience building", "Advanced coping", "Life balance"]
//         }
//     ],
//     goalsMotivation: [
//         {
//             title: "Goal Setting Fundamentals",
//             description: "Learn how to set and achieve meaningful goals. Develop motivation and follow-through.",
//             url: "/courses/goal-setting",
//             forScores: [1, 2],
//             keyTopics: ["Goal setting", "Motivation building", "Action planning"]
//         },
//         {
//             title: "Advanced Achievement Strategies",
//             description: "Take your goal achievement to the next level with advanced motivation techniques.",
//             url: "/courses/motivation-advanced",
//             forScores: [3, 4],
//             keyTopics: ["Advanced planning", "Habit formation", "Success mindset"]
//         }
//     ]
// };

// // Function to save quiz answers for a section
// function saveQuizData(sectionName, answers) {
//     try {
//         // Get existing quiz data or initialize new object
//         let quizData = JSON.parse(localStorage.getItem('quizData') || '{}');
        
//         // Add new section data
//         quizData[sectionName] = answers;
        
//         localStorage.setItem('quizAnswers', JSON.stringify(quizData));
        
//         return true;
//     } catch (error) {
//         console.error('Error saving quiz data:', error);
//         return false;
//     }
// }

// // Function to get slider values from a section
// function getSliderValues(formId) {
//     const form = document.getElementById(formId);
//     const sliders = form.querySelectorAll('input[type="range"]');
//     return Array.from(sliders).map(slider => parseInt(slider.value));
// }

// // Function to calculate average score for a section
// function calculateSectionScore(answers) {
//     if (!answers || answers.length === 0) return 0;
//     const sum = answers.reduce((acc, curr) => acc + curr, 0);
//     return sum / answers.length;
// }

// // Function to process all quiz results and generate recommendations
// function processQuizResults(quizData) {
//     const recommendations = [];
//     const scores = {};
    
//     // Process each section
//     for (const [section, answers] of Object.entries(quizData)) {
//         // Calculate section score
//         const score = calculateSectionScore(answers);
//         scores[section] = score;
        
//         // If score is low (1 or 2), add course recommendation
//         if (score <= 2) {
//             const recommendation = courseRecommendations[section]?.find(course => 
//                 course.forScores.includes(Math.round(score)));
            
//             if (recommendation) {
//                 recommendations.push({
//                     section: section,
//                     score: score,
//                     course: recommendation
//                 });
//             }
//         }
//     }
    
//     return {
//         recommendations,
//         scores,
//         summary: generateSummary(scores)
//     };
// }

// // Function to generate a summary of results
// function generateSummary(scores) {
//     let summary = {
//         overallScore: 0,
//         areasForImprovement: [],
//         strengths: []
//     };
    
//     // Calculate overall score
//     const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
//     summary.overallScore = totalScore / Object.keys(scores).length;
    
//     // Identify areas for improvement and strengths
//     for (const [section, score] of Object.entries(scores)) {
//         if (score <= 2) {
//             summary.areasForImprovement.push(section);
//         } else if (score >= 4) {
//             summary.strengths.push(section);
//         }
//     }
    
//     return summary;
// }

// // Function to format section names for display
// function formatSectionName(section) {
//     return section
//         .replace(/([A-Z])/g, ' $1')
//         .replace(/^./, str => str.toUpperCase());
// }

// // Function to handle section completion and navigation
// function handleSectionComplete(currentSection, nextSection) {
//     const sliderValues = getSliderValues(currentSection + '-form');
//     if (saveQuizData(currentSection, sliderValues)) {
//         window.location.href = nextSection + '.html';
//     } else {
//         alert('There was an error saving your answers. Please try again.');
//     }
// }

// // Example usage in a section page:

// // Example usage:
// const sampleQuizData = {
//     emotionalWellbeing: [1, 2, 1], // Average: 1.33 - Will recommend course
//     relationships: [3, 4], // Average: 3.5 - No course needed
//     selfEsteem: [1, 2], // Average: 1.5 - Will recommend course
//     copingMechanisms: [2, 2], // Average: 2 - Will recommend course
//     goalsMotivation: [4, 4] // Average: 4 - No course needed
// };
  
// // Process results and get recommendations
// const recommendations = processQuizResults(sampleQuizData);

// // Function to display recommendations
// function displayRecommendations(recommendations) {
// return recommendations.map(course => `
//     <div class="course-recommendation">
//     <h3>${course.title}</h3>
//     <p>${course.description}</p>
//     <a href="${course.url}" class="course-link">Learn More</a>
//     </div>
// `).join('');
// }


// document.getElementById('section1-form').onsubmit = function(e) {
//     e.preventDefault();
//     handleSectionComplete('emotionalWellbeing', 'section2');
// };


// // Example usage in results page:

// window.addEventListener('load', () => {
//     const quizData = JSON.parse(localStorage.getItem('quizAnswers'));
//     if (quizData) {
//         const results = processQuizResults(quizData);
//         displayResults(results);
//         localStorage.removeItem('quizAnswers'); // Clear after displaying
//     }
// });
