import { Component, OnInit } from '@angular/core';
import { gantt } from 'dhtmlx-gantt';  // Correct import syntax

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.initializeGanttChart();
  }

  initializeGanttChart(): void {
    // Sample data for tasks and dependencies
    const tasks = {
      data: [
        { id: 1, text: 'Title-1', start_date: '2024-08-09', duration: 5,  status: 'Completed' },
        { id: 2, text: 'Title-2', start_date: '2024-10-06', duration: 6,  status: 'In Progress' },
        { id: 3, text: 'Title-3', start_date: '2025-01-12', duration: 3,  status: 'Completed' },
        { id: 4, text: 'Title-4', start_date: '2024-09-01', duration: 5,  status: 'Completed' },
        { id: 5, text: 'Title-5', start_date: '2024-07-06', duration: 6,  status: 'Completed' },
        { id: 6, text: 'Title-6', start_date: '2024-11-12', duration: 3,  status: 'Completed' },
        { id: 7, text: 'Title-7', start_date: '2024-11-01', duration: 5,  status: 'In Progress' },
        { id: 8, text: 'Title-8', start_date: '2024-09-06', duration: 6,  status: 'Completed' },
        { id: 9, text: 'Title-9', start_date: '2024-11-12', duration: 3,  status: 'Completed' },
        { id: 10, text: 'Title-10', start_date: '2024-11-01', duration: 5,  status: 'Completed' },
        { id: 11, text: 'Title-11', start_date: '2024-10-06', duration: 6,  status: 'In Progress' },
        { id: 12, text: 'Title-12', start_date: '2024-12-12', duration: 3,  status: 'Completed' },
        { id: 13, text: 'Title-13', start_date: '2024-10-01', duration: 5,  status: 'Completed' },
        { id: 14, text: 'Title-14', start_date: '2024-10-06', duration: 6,  status: 'In Progress' },
        { id: 15, text: 'Title-15', start_date: '2024-12-12', duration: 3,  status: 'Completed' },
        { id: 16, text: 'Title-16', start_date: '2024-09-01', duration: 4,  status: 'Completed' },
        { id: 17, text: 'Title-17', start_date: '2024-07-06', duration: 7,  status: 'Completed' },
        { id: 18, text: 'Title-18', start_date: '2025-01-12', duration: 2,  status: 'Completed' },
        { id: 19, text: 'Title-19', start_date: '2025-03-01', duration: 1,  status: 'Completed' },
        { id: 20, text: 'Title-20', start_date: '2024-12-06', duration: 3,  status: 'Completed' },
        { id: 21, text: 'Title-21', start_date: '2024-11-12', duration: 4,  status: 'Completed' },
        { id: 22, text: 'Title-22', start_date: '2025-01-01', duration: 2,  status: 'Completed' },
        { id: 23, text: 'Title-23', start_date: '2024-10-06', duration: 3,  status: 'Completed' },
        { id: 24, text: 'Title-24', start_date: '2024-12-12', duration: 3,  status: 'Completed' },
        { id: 25, text: 'Title-25', start_date: '2025-01-01', duration: 3,  status: 'In Progress' },
        { id: 26, text: 'Title-26', start_date: '2025-02-06', duration: 2,  status: 'Not Started' },
        { id: 27, text: 'Title-27', start_date: '2024-12-12', duration: 3,  status: 'Completed' },
        { id: 28, text: 'Title-28', start_date: '2024-09-01', duration: 6,  status: 'Completed' },
        { id: 29, text: 'Title-29', start_date: '2024-07-06', duration: 7,  status: 'Completed' },
        { id: 30, text: 'Title-30', start_date: '2024-09-12', duration: 4,  status: 'Completed' },
        { id: 31, text: 'Title-31', start_date: '2025-02-12', duration: 2,  status: 'Not Started' },
        { id: 32, text: 'Title-32', start_date: '2025-02-12', duration: 1,  status: 'Completed' },
        { id: 33, text: 'Title-33', start_date: '2025-01-12', duration: 3,  status: 'Not Started' },
        { id: 34, text: 'Title-34', start_date: '2025-01-12', duration: 3,  status: 'Completed' },
        { id: 35, text: 'Title-35', start_date: '2025-01-12', duration: 3,  status: 'In Progress' },
        { id: 36, text: 'Title-36', start_date: '2025-01-12', duration: 3,  status: 'Not Started' },
        { id: 37, text: 'Title-37', start_date: '2025-01-12', duration: 2,  status: 'Completed' },
        { id: 38, text: 'Title-38', start_date: '2025-03-12', duration: 1,  status: 'Not Started' },
        { id: 39, text: 'Title-39', start_date: '2024-11-12', duration: 5,  status: 'Not Started' },
        { id: 40, text: 'Title-40', start_date: '2024-09-12', duration: 4,  status: 'Completed' },
        { id: 41, text: 'Title-41', start_date: '2024-08-12', duration: 6,  status: 'Completed' },
        { id: 42, text: 'Title-42', start_date: '2024-10-12', duration: 3,  status: 'Completed' },
        { id: 43, text: 'Title-43', start_date: '2025-02-12', duration: 2,  status: 'In Progress' },
        { id: 44, text: 'Title-44', start_date: '2024-11-12', duration: 4,  status: 'Completed' },
        { id: 45, text: 'Title-45', start_date: '2024-11-12', duration: 4,  status: 'Completed' },
        { id: 46, text: 'Title-46', start_date: '2025-01-12', duration: 3,  status: 'Not Started' },
        { id: 47, text: 'Title-47', start_date: '2024-10-12', duration: 3,  status: 'Completed' },
        { id: 48, text: 'Title-48', start_date: '2024-11-12', duration: 3,  status: 'Completed' },
        { id: 49, text: 'Title-49', start_date: '2024-11-12', duration: 2,  status: 'Completed' },
        { id: 50, text: 'Title-50', start_date: '2025-03-12', duration: 1,  status: 'Not Started' },
        { id: 51, text: 'Title-51', start_date: '2025-02-12', duration: 2,  status: 'Not Started' },
        { id: 52, text: 'Title-52', start_date: '2025-01-12', duration: 3,  status: 'In Progress' },
        { id: 53, text: 'Title-53', start_date: '2025-01-12', duration: 2,  status: 'Completed' },
        { id: 54, text: 'Title-54', start_date: '2025-01-12', duration: 2,  status: 'Completed' },
        { id: 55, text: 'Title-55', start_date: '2024-08-12', duration: 6,  status: 'Completed' },      
        { id: 56, text: 'Title-56', start_date: '2024-07-12', duration: 6,  status: 'Completed' },
        { id: 57, text: 'Title-57', start_date: '2024-11-12', duration: 4,  status: 'Completed' },
        { id: 58, text: 'Title-58', start_date: '2024-09-12', duration: 5,  status: 'Completed' },
        { id: 59, text: 'Title-59', start_date: '2025-01-12', duration: 3,  status: 'In Progress' },
        { id: 60, text: 'Title-60', start_date: '2024-11-12', duration: 2,  status: 'Completed' },
        { id: 61, text: 'Title-61', start_date: '2025-03-12', duration: 1,  status: 'Not Started' },
        

        // Add more tasks as needed
      ],
      links: [
        { id: 1, source: 1, target: 2, type: '0' }, // Link between task 1 and task 2
        { id: 2, source: 2, target: 3, type: '0' }, // Link between task 2 and task 3
        { id: 3, source: 3, target: 4, type: '0' }, // Link between task 3 and task 4
        { id: 4, source: 4, target: 5, type: '0' }, // Link between task 4 and task 5
        { id: 5, source: 5, target: 6, type: '0' }, // Link between task 5 and task 6
        { id: 6, source: 6, target: 7, type: '0' }, // Link between task 6 and task 7
        { id: 7, source: 7, target: 8, type: '0' }, // Link between task 7 and task 8
        { id: 8, source: 8, target: 9, type: '0' }, // Link between task 8 and task 9
        { id: 9, source: 9, target: 10, type: '0' }, // Link between task 9 and task 10
        { id: 10, source: 10, target: 11, type: '0' }, // Link between task 10 and task 11
        { id: 11, source: 11, target: 12, type: '0' }, // Link between task 11 and task 12
        { id: 12, source: 12, target: 13, type: '0' }, // Link between task 12 and task 13
        { id: 13, source: 13, target: 14, type: '0' }, // Link between task 13 and task 14
        { id: 14, source: 14, target: 15, type: '0' }, // Link between task 14 and task 15
        { id: 15, source: 15, target: 16, type: '0' }, // Link between task 15 and task 16
        { id: 16, source: 16, target: 17, type: '0' }, // Link between task 16 and task 17
        { id: 17, source: 17, target: 18, type: '0' }, // Link between task 17 and task 18
        { id: 18, source: 18, target: 19, type: '0' }, // Link between task 18 and task 19
        { id: 19, source: 19, target: 20, type: '0' }, // Link between task 19 and task 20
        { id: 20, source: 20, target: 21, type: '0' }, // Link between task 20 and task 21
        { id: 21, source: 21, target: 22, type: '0' }, // Link between task 21 and task 22
        { id: 22, source: 22, target: 23, type: '0' }, // Link between task 22 and task 23
        { id: 23, source: 23, target: 24, type: '0' }, // Link between task 23 and task 24
        { id: 24, source: 24, target: 25, type: '0' }, // Link between task 24 and task 25
        { id: 25, source: 25, target: 26, type: '0' }, // Link between task 25 and task 26
        { id: 26, source: 26, target: 27, type: '0' }, // Link between task 26 and task 27
        { id: 27, source: 27, target: 28, type: '0' }, // Link between task 27 and task 28
        { id: 28, source: 28, target: 29, type: '0' }, // Link between task 28 and task 29    
        { id: 29, source: 29, target: 30, type: '0' }, // Link between task 29 and task 30
        { id: 30, source: 30, target: 31, type: '0' }, // Link between task 30 and task 31
        { id: 31, source: 31, target: 32, type: '0' }, // Link between task 31 and task 32
        { id: 32, source: 32, target: 33, type: '0' }, // Link between task 32 and task 33
        { id: 33, source: 33, target: 34, type: '0' }, // Link between task 33 and task 34
        { id: 34, source: 34, target: 35, type: '0' }, // Link between task 34 and task 35
        { id: 35, source: 35, target: 36, type: '0' }, // Link between task 35 and task 36
        { id: 36, source: 36, target: 37, type: '0' }, // Link between task 36 and task 37
        { id: 37, source: 37, target: 38, type: '0' }, // Link between task 37 and task 38
        { id: 38, source: 38, target: 39, type: '0' }, // Link between task 38 and task 39
        { id: 39, source: 39, target: 40, type: '0' }, // Link between task 39 and task 40
        { id: 40, source: 40, target:41 , type:'0'},//Link between Task40 and Task41
        { id: 41, source: 41, target:42 , type:'0'},//Link between Task41 and Task42
        { id: 42, source: 42, target:43 , type:'0'},//Link between Task42 and Task43
        { id: 43, source: 43, target:44 , type:'0'},//Link between Task43 and Task44
        { id: 44, source: 44, target:45 , type:'0'},//Link between Task44 and Task45
        { id: 45, source: 45, target:46 , type:'0'},//Link between Task45 and Task46
        { id: 46, source: 46, target:47 , type:'0'},//Link between Task46 and Task47
        { id: 47, source: 47, target:48 , type:'0'},//Link between Task47 and Task48
        { id: 48, source: 48, target:49 , type:'0'},//Link between Task48 and Task49
        { id: 49, source: 49, target:50 , type:'0'},//Link between Task49 and Task50
        { id: 50, source: 50, target:51 , type:'0'},//Link between Task50 and Task51
        { id: 51, source: 51, target:52 , type:'0'},//Link between Task51 and Task52
        { id: 52, source: 52, target:53 , type:'0'},//Link between Task52 and Task53
        { id: 53, source: 53, target:54 , type:'0'},//Link between Task53 and Task54
        { id: 54, source: 54, target:55 , type:'0'},//Link between Task54 and Task55
        { id: 55, source: 55, target:56 , type:'0'},//Link between Task55 and Task56
        { id: 56, source: 56, target:57 , type:'0'},//Link between Task56 and Task57
        { id: 57, source: 57, target:58 , type:'0'},//Link between Task57 and Task58
        { id: 58, source: 58, target:59 , type:'0'},//Link between Task58 and Task59
        { id: 59, source: 59, target:60 , type:'0'},//Link between Task59 and Task60
        { id: 60, source: 60, target:61 , type:'0'},//Link between Task60 and Task61
        { id: 61, source: 61, target:62 , type:'0'},//Link between Task61 and Task62
        // Add more dependencies as needed
      ]
    };

    // Initialize Gantt chart
    gantt.config.date_format = "%Y-%m-%d"; // Set date format to yyyy-mm-dd
    gantt.init('gantt_here');
    gantt.parse(tasks);

    // Apply custom styles for task progress and status
    gantt.templates.task_class = (start, end, task) => {
      if (task['status'] === 'Completed') {
        return 'completed-task';
      } else if (task['status'] === 'In Progress') {
        return 'in-progress-task';
      } else {
        return 'not-started-task';
      }
    };

    // Enable filtering options
    gantt.config['filtering'] = true;
    gantt.config['filter_collection'] = [
      { id: "status", label: "Status", options: ["Not Started", "In Progress", "Completed"] }
    ];
  }
}
