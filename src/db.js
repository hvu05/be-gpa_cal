users: [
    {
        _id: ObjectId("u001"),
        username: "lan",
        email: "lan@example.com",
        createdAt: ISODate("2025-08-22T00:00:00Z"),   // ngày tạo
        expiredAt: ISODate("2025-08-25T00:00:00Z"),   // hết hạn sau 3 ngày
        isPurchased: false,                           // chưa mua (true nếu đã mua)
    },
    {
        _id: ObjectId("u002"),
        username: "nam",
        email: "nam@example.com",
        createdAt: ISODate("2025-08-21T00:00:00Z"),
        expiredAt: ISODate("2025-08-24T00:00:00Z"),
        isPurchased: true,
    }
]

subjects: {
    [
        {
            _id: ObjectId("s101"),
            subjectName: "Giải tích 1",
            credit: 3
        },
        {
            _id: ObjectId("s102"),
            subjectName: "Vật lý đại cương",
            credit: 4
        },
        {
            _id: ObjectId("s103"),
            subjectName: "Lập trình C",
            credit: 3
        }
    ]
}

grades: [
    // Lan học 3 môn
    {
        _id: ObjectId("g001"),
        userId: ObjectId("u001"),          // tham chiếu đến users
        subjectId: ObjectId("s101"),       // tham chiếu đến subjects
        semester: "2024-2025 HK1",
        grade10: 9.0,                      // điểm thang 10
        grade4: 4.0,                       // điểm thang 4
        gradeChar: "A"                     // điểm chữ
    },
    {
        _id: ObjectId("g002"),
        userId: ObjectId("u001"),
        subjectId: ObjectId("s102"),
        semester: "2024-2025 HK1",
        grade10: 8.0,
        grade4: 3.5,
        gradeChar: "B+"
    },
    {
        _id: ObjectId("g003"),
        userId: ObjectId("u001"),
        subjectId: ObjectId("s103"),
        semester: "2024-2025 HK1",
        grade10: 7.5,
        grade4: 3.0,
        gradeChar: "B"
    },

    // Nam học 3 môn
    {
        _id: ObjectId("g004"),
        userId: ObjectId("u002"),
        subjectId: ObjectId("s101"),
        semester: "2024-2025 HK1",
        grade10: 6.5,
        grade4: 2.5,
        gradeChar: "C+"
    },
    {
        _id: ObjectId("g005"),
        userId: ObjectId("u002"),
        subjectId: ObjectId("s102"),
        semester: "2024-2025 HK1",
        grade10: 7.0,
        grade4: 3.0,
        gradeChar: "B"
    },
    {
        _id: ObjectId("g006"),
        userId: ObjectId("u002"),
        subjectId: ObjectId("s103"),
        semester: "2024-2025 HK1",
        grade10: 8.5,
        grade4: 3.5,
        gradeChar: "B+"
    }
]
