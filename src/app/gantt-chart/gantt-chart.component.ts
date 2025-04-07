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
        { id: 1, text: 'Complete Project Documentation', start_date: '2025-03-01', duration: 5, progress: 0.4, status: 'In Progress' },
        { id: 2, text: 'Develop User Authentication Module', start_date: '2025-03-06', duration: 6, progress: 0.2, status: 'Not Started' },
        { id: 3, text: 'Testing & Bug Fixing', start_date: '2025-03-12', duration: 3, progress: 1, status: 'Completed' },
        // Add more tasks as needed
      ],
      links: [
        { id: 1, source: 1, target: 2, type: '0' }, // Link between task 1 and task 2
        { id: 2, source: 2, target: 3, type: '0' }, // Link between task 2 and task 3
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
