const data = {
  teacher: [
    {
      title: 'lastCourse',
      icon: 'iconLastCourse',
      link: 'guide/last?',
      isLegacy: true
    },
    {
      title: 'myCourses',
      icon: 'iconCourse',
      link: 'courses?type=2&',
      showType: 'v1'
    },
    {
      title: 'achievedCourse',
      icon: 'iconAchievedCourse',
      link: 'courses?type=3&',
      showType: 'v1'
    },
    {
      title: 'bindAccount',
      icon: 'iconBinding',
      link: 'teacher/unbind?',
      showType: 'v1'
    },
    {
      title: 'interactRank',
      icon: 'iconInteractRank',
      link: 'interact/rank?',
      showType: 'v1'
    },
    {
      title: 'scanForLogin',
      icon: 'iconScan',
      link: 'teacher-scan-qr?',
      showType: 'v1'
    },
    {
      title: 'forHelp',
      icon: 'iconHelp',
      link: 'https://teachermate.kf5.com/hc/',
      isUrl: true
    }
    // {
    //   title: 'linkToStudent',
    //   icon: 'iconToStudent',
    //   link: 'hub?type=student&',
    // },
  ],
  student: [
    {
      title: 'checkIn',
      icon: 'iconCheckIn',
      link: 'guide/signin?',
      isLegacy: true
    },
    {
      title: 'responder',
      icon: 'iconResponder',
      link: 'v1/student/responder?',
      isLegacy: true
    },
    {
      title: 'answer',
      icon: 'iconAnswer',
      link: 'guide/answer?',
      isLegacy: true
    },
    {
      title: 'discussion',
      icon: 'iconDiscuss',
      link: 'discuss/course/list?',
      showType: 'v1'
    },
    {
      title: 'assessment',
      icon: 'iconAssessment',
      link: 'student/assessments?',
      showType: 'v1'
    },
    {
      title: 'coursewares',
      icon: 'iconCourseware',
      link: 'student/courseListForCourseware?',
      showType: 'v1'
    },
    {
      title: 'joinCourse',
      icon: 'iconJoin',
      link: 'student/join/classroom?',
      showType: 'v1'
    },
    {
      title: 'history',
      icon: 'iconHistory',
      link: 'guide/his_answer?',
      isLegacy: true
    },
    {
      title: 'studentInfo',
      icon: 'iconStudentInfo',
      link: 'student/archive/lists?',
      showType: 'v1'
    },
    {
      title: 'quitCourse',
      icon: 'iconCourse',
      link: 'student/courses/quit?',
      showType: 'v1'
    }
  ],
  link: 'student/edit'
};

export default data;
