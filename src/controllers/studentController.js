const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getStudent = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    try {
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};
        const students = await Student.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await Student.countDocuments(query);
        res.json({ students, totalPages: Math.ceil(count / limit), currentPage: page });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    } catch (error) {
        req.status(400).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (error) {
        req.status(500).json({ error: error.message });
    }
}