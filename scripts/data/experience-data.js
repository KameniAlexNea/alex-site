// Complete experience data including work experience and education
const experienceData = {
    workExperience: [
        {
            id: 1,
            title: "Data Scientist",
            company: "Ivalua",
            type: "Full-time",
            duration: "January 2023 - Present",
            location: "France",
            description: "Constructing robust data pipelines for training invoice data capture systems. Assessing and implementing enhancements to existing machine learning pipelines. Innovating novel concepts to enhance Invoice Data Capture (IDC) system architecture.",
            skills: ["Machine Learning", "Computer Vision", "Python", "Natural Language Processing", "Data Science"],
            achievements: [
                "Developed sophisticated multimodal model for advancing IDC data comprehension",
                "Created testing views using Gradio for deployed web services",
                "Specialized LLM models on custom tasks and integrated into Ivalua products"
            ]
        },
        {
            id: 2,
            title: "Software Engineer",
            company: "Defacto Technologies",
            type: "Full-time (CDD then CDI)",
            duration: "October 2021 - December 2022",
            location: "France",
            description: "Application development including specifications and participation with R&D team in Innova product applications development and validation.",
            skills: ["Python", "JavaScript", "Java", "GraphQL", "Software Development"],
            achievements: [
                "Developed Python client for managing user-allocated resources",
                "Improved JavaScript interface with new features for resource monitoring",
                "Implemented Java backend and GraphQL database"
            ]
        },
        {
            id: 3,
            title: "Machine Learning Researcher",
            company: "Etis Lab, ENSEA",
            type: "Internship",
            duration: "April 2022 - September 2022",
            location: "France",
            description: "Research on data incremental learning in deep architectures focusing on continual learning scenarios.",
            skills: ["Deep Learning", "Continual Learning", "Research", "Python", "PyTorch"],
            achievements: [
                "Explored three scenarios of continual learning",
                "Developed continual self-supervised learning through distillation and replay",
                "Enhanced existing memory-based approaches for continual learning"
            ]
        },
        {
            id: 4,
            title: "Machine Learning Intern",
            company: "École Nationale Supérieure Polytechnique de Yaoundé",
            type: "Internship",
            duration: "July 2020 - September 2020",
            location: "Cameroon",
            description: "Research on understanding user tasks on the web using machine learning and natural language processing.",
            skills: ["Python", "TensorFlow", "Scikit-learn", "NLP", "Transformers"],
            achievements: [
                "Developed ML models for user query understanding",
                "Implemented NLP techniques for web task interpretation"
            ]
        },
        {
            id: 5,
            title: "Software Developer",
            company: "Upgrade-Group",
            type: "Contract",
            duration: "January 2020 - February 2020",
            location: "Cameroon",
            description: "FSD generation software development for PWC client.",
            skills: ["Java", "JavaFX"],
            achievements: [
                "Delivered FSD generation software solution",
                "Worked with enterprise-level requirements"
            ]
        },
        {
            id: 6,
            title: "Software Developer Intern",
            company: "Megasoft",
            type: "Internship", 
            duration: "June 2019 - August 2019",
            location: "Gabon",
            description: "Software creation and testing of an ERP system for the Ministry of Economy of Gabon.",
            skills: ["Java SE", "JUnit", "DbUnit", "Software Testing"],
            achievements: [
                "Developed ERP system for government ministry",
                "Implemented comprehensive testing suite"
            ]
        }
    ],
    education: [
        {
            id: 1,
            degree: "Master's Degree",
            field: "Data Science and Machine Learning",
            institution: "École nationale supérieure de l'Électronique et de ses Applications (ENSEA)",
            duration: "September 2021 - August 2022",
            location: "France",
            description: "Advanced coursework in Computational Image Processing, Artificial Intelligence, Machine Learning, Data Integration and Mining, Deep Learning for Image and Video Analysis, and Big Data Architecture.",
            achievements: [
                "Research-focused curriculum with emphasis on practical applications",
                "Final Project: Data Incremental Learning Applied to Self-Supervised Learning Models in Computer Vision",
                "Developed novel approaches to continual learning with limited supervision"
            ]
        },
        {
            id: 2,
            degree: "Master's Degree",
            field: "Computer Science Engineering",
            institution: "École Nationale Supérieure Polytechnique de Yaoundé",
            duration: "September 2018 - August 2021",
            location: "Cameroon",
            description: "Comprehensive training in Fundamentals of Machine Learning, Deep Learning for Image Processing, Database Management, Data Mining, Software Engineering, Multi-Agent Systems, Big Data Analytics, and Artificial Intelligence.",
            achievements: [
                "Balanced theoretical foundations with practical implementations",
                "Final Project: Constraint Optimization of Resources Used by Tasks in Workflows",
                "Designed efficient algorithms for resource allocation in complex workflow systems"
            ]
        },
        {
            id: 3,
            degree: "Preparatory Classes",
            field: "Mathematics and Physical Sciences",
            institution: "École Nationale Supérieure Polytechnique de Yaoundé",
            duration: "September 2016 - August 2018",
            location: "Cameroon",
            description: "Intensive two-year program focused on engineering foundations with emphasis on advanced Mathematics and Physics.",
            achievements: [
                "Developed strong analytical thinking and problem-solving skills",
                "Rigorous preparation for competitive engineering school entrance examinations"
            ]
        }
    ]
};

export { experienceData };
