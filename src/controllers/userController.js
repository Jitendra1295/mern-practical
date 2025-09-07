const { AppDataSource } = require('../data-source');

async function createUser(req, res) {
    const { name, email, domain, role = 'student' } = req.body;

    try {
        // Validate required fields
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Name is required and must be a string' });
        }

        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: 'Email is required and must be a string' });
        }

        // Validate name length and content
        if (name.trim().length < 2) {
            return res.status(400).json({ error: 'Name must be at least 2 characters long' });
        }

        if (name.trim().length > 100) {
            return res.status(400).json({ error: 'Name must be less than 100 characters' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate email length
        if (email.length > 255) {
            return res.status(400).json({ error: 'Email must be less than 255 characters' });
        }

        // Validate domain if provided
        if (domain && typeof domain === 'string') {
            const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/;
            if (!domainRegex.test(domain)) {
                return res.status(400).json({ error: 'Invalid domain format' });
            }
        }

        // Validate role
        const validRoles = ['student', 'instructor', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Must be student, instructor, or admin' });
        }

        const userRepo = AppDataSource.getRepository('User');

        // Check if user with this email already exists
        const existingUser = await userRepo.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Sanitize inputs
        const sanitizedName = name.trim();
        const sanitizedEmail = email.toLowerCase().trim();
        const sanitizedDomain = domain ? domain.toLowerCase().trim() : null;

        // Create new user
        const user = userRepo.create({
            name: sanitizedName,
            email: sanitizedEmail,
            domain: sanitizedDomain,
            role
        });

        const savedUser = await userRepo.save(user);

        // Return user without sensitive data
        const { id, name: userName, email: userEmail, domain: userDomain, role: userRole } = savedUser;

        return res.status(201).json({
            ok: true,
            message: 'User created successfully',
            user: { id, name: userName, email: userEmail, domain: userDomain, role: userRole }
        });

    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function getUsers(req, res) {
    try {
        const userRepo = AppDataSource.getRepository('User');
        const users = await userRepo.find({
            select: ['id', 'name', 'email', 'domain', 'role']
        });

        return res.json({ ok: true, users });
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function getUserById(req, res) {
    const userId = parseInt(req.params.id, 10);

    try {
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const userRepo = AppDataSource.getRepository('User');
        const user = await userRepo.findOne({
            where: { id: userId },
            select: ['id', 'name', 'email', 'domain', 'role']
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({ ok: true, user });
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { createUser, getUsers, getUserById };
