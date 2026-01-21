const Inquiry = require('../models/Inquiry');
const XLSX = require('xlsx');

// Submit inquiry (Public)
exports.submitInquiry = async (req, res) => {
    try {
        const { name, email, phone, state, city, course, consent, source, subject, message, type } = req.body;
        const newInquiry = new Inquiry({
            name,
            email,
            phone,
            state,
            city,
            course,
            consent,
            type: type || 'scholarship',
            source: source || 'enquiry_modal',
            subject: subject || (type === 'callback' ? 'Request a Call' : 'Scholarship/Course Application'),
            message: message || (type === 'callback' ? 'User requested a call back.' : 'New application submitted through unified form.')
        });
        const savedInquiry = await newInquiry.save();
        res.status(201).json({ message: 'Inquiry submitted successfully', data: savedInquiry });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting inquiry', error: error.message });
    }
};

// Export inquiries to Excel (Admin)
exports.exportInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });

        const data = inquiries.map(inquiry => ({
            'Date': new Date(inquiry.createdAt).toLocaleString(),
            'Type': inquiry.type === 'callback' ? 'Callback Request' : (inquiry.type === 'contact' ? 'Contact Message' : 'Scholarship Inquiry'),
            'Name': inquiry.name,
            'Email': inquiry.email,
            'Phone': inquiry.phone,
            'State': inquiry.state || '-',
            'City': inquiry.city || '-',
            'Course': inquiry.course || '-',
            'Consent': inquiry.consent ? 'Yes' : 'No',
            'Subject': inquiry.subject || '-',
            'Message': inquiry.message || '-',
            'Source': inquiry.source,
            'Status': inquiry.status
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Inquiries');

        const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=Inquiries_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting inquiries', error: error.message });
    }
};

// Get all inquiries (Admin)
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inquiries', error: error.message });
    }
};

// Update inquiry status (Admin)
exports.updateInquiryStatus = async (req, res) => {
    try {
        const updatedInquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
        res.json(updatedInquiry);
    } catch (error) {
        res.status(400).json({ message: 'Error updating status', error: error.message });
    }
};
