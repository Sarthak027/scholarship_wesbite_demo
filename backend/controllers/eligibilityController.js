const EligibilitySubmission = require('../models/EligibilitySubmission');
const XLSX = require('xlsx');

// Submit eligibility (Public)
exports.submitEligibility = async (req, res) => {
    try {
        const {
            fullName,
            mobileNumber,
            email,
            course,
            tenthMarks,
            twelfthMarks,
            graduationMarks,
            entranceExam,
            examScore,
            calculatedReward
        } = req.body;

        // Validate required fields
        if (!fullName || !mobileNumber || !email || !course || !tenthMarks || !twelfthMarks || !entranceExam || examScore === undefined || !calculatedReward) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSubmission = new EligibilitySubmission({
            fullName,
            mobileNumber,
            email,
            course: course.toLowerCase(),
            tenthMarks: parseFloat(tenthMarks),
            twelfthMarks: parseFloat(twelfthMarks),
            graduationMarks: graduationMarks ? parseFloat(graduationMarks) : undefined,
            entranceExam,
            examScore: parseFloat(examScore),
            calculatedReward: parseFloat(calculatedReward),
            status: 'pending'
        });

        const savedSubmission = await newSubmission.save();
        res.status(201).json({
            message: 'Eligibility submission successful',
            data: savedSubmission
        });
    } catch (error) {
        console.error('Eligibility submission error:', error);
        res.status(400).json({ message: 'Error submitting eligibility', error: error.message });
    }
};

// Get all submissions (Admin)
exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await EligibilitySubmission.find().sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
};

// Export submissions to Excel (Admin)
exports.exportSubmissions = async (req, res) => {
    try {
        const submissions = await EligibilitySubmission.find().sort({ createdAt: -1 });

        const data = submissions.map(submission => ({
            'Date': new Date(submission.createdAt).toLocaleString(),
            'Full Name': submission.fullName,
            'Mobile Number': submission.mobileNumber,
            'Email': submission.email,
            'Course': submission.course.toUpperCase(),
            '10th Marks (%)': submission.tenthMarks,
            '12th Marks (%)': submission.twelfthMarks,
            'Graduation Marks (%)': submission.graduationMarks || '-',
            'Entrance Exam': submission.entranceExam,
            'Exam Score': submission.examScore,
            'Calculated Reward (₹)': submission.calculatedReward.toLocaleString('en-IN'),
            'Status': submission.status.charAt(0).toUpperCase() + submission.status.slice(1)
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);

        // Set column widths
        ws['!cols'] = [
            { wch: 20 }, // Date
            { wch: 25 }, // Full Name
            { wch: 15 }, // Mobile
            { wch: 30 }, // Email
            { wch: 10 }, // Course
            { wch: 12 }, // 10th
            { wch: 12 }, // 12th
            { wch: 15 }, // Graduation
            { wch: 18 }, // Entrance Exam
            { wch: 12 }, // Score
            { wch: 18 }, // Reward
            { wch: 12 }  // Status
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Eligibility Submissions');

        const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=Eligibility_Submissions_${new Date().toISOString().split('T')[0]}.xlsx`);
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting submissions', error: error.message });
    }
};

// Update submission status (Admin)
exports.updateSubmissionStatus = async (req, res) => {
    try {
        const updatedSubmission = await EligibilitySubmission.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.json(updatedSubmission);
    } catch (error) {
        res.status(400).json({ message: 'Error updating status', error: error.message });
    }
};

// Get submission by ID (Admin)
exports.getSubmissionById = async (req, res) => {
    try {
        const submission = await EligibilitySubmission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.json(submission);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submission', error: error.message });
    }
};
