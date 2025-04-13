import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { TeamMember } from '../models/team.model'; // ✅ Make sure this file exists!
import { from, Observable, of, switchMap } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore'; // 👈 ensure this is imported


@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  private getCollectionPath(type: 'tasks' | 'projects' | 'teams'): Observable<string> {
    return this.authService.getUser().pipe(
      switchMap((user: any) => {
        if (user?.uid) {
          return of(`users/${user.uid}/${type}`);
        }
        return of('');
      })
    );
  }

  // --------------------- TASKS ---------------------
  addTask(task: Task): Observable<any> {
    return this.getCollectionPath('tasks').pipe(
      switchMap((path) => from(addDoc(collection(this.firestore, path), task)))
    );
  }

  updateTask(taskId: string, updates: Partial<Task>): Observable<any> {
    return this.getCollectionPath('tasks').pipe(
      switchMap((path) => from(updateDoc(doc(this.firestore, `${path}/${taskId}`), updates)))
    );
  }

  deleteTask(taskId: string): Observable<any> {
    return this.getCollectionPath('tasks').pipe(
      switchMap((path) => from(deleteDoc(doc(this.firestore, `${path}/${taskId}`))))
    );
  }

  getTasks(): Observable<Task[]> {
    return this.getCollectionPath('tasks').pipe(
      switchMap((path) =>
        from(getDocs(collection(this.firestore, path))).pipe(
          switchMap(snapshot => {
            const tasks: Task[] = snapshot.docs.map(docSnap => {
              const data: any = docSnap.data();
              return {
                id: docSnap.id,
                ...data,
                dueDate: data['dueDate']?.toDate?.() || data['dueDate']
              } as Task;
            });
            return of(tasks);
          })
        )
      )
    );
  }
  
  
  
  // --------------------- PROJECTS ---------------------
  addProject(project: Project): Observable<any> {
    return this.getCollectionPath('projects').pipe(
      switchMap((path) => from(addDoc(collection(this.firestore, path), project)))
    );
  }

  updateProject(projectId: string, updates: Partial<Project>): Observable<any> {
    return this.getCollectionPath('projects').pipe(
      switchMap((path) => from(updateDoc(doc(this.firestore, `${path}/${projectId}`), updates)))
    );
  }

  deleteProject(projectId: string): Observable<any> {
    return this.getCollectionPath('projects').pipe(
      switchMap((path) => from(deleteDoc(doc(this.firestore, `${path}/${projectId}`))))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.getCollectionPath('projects').pipe(
      switchMap((path) =>
        from(getDocs(collection(this.firestore, path))).pipe(
          switchMap(snapshot => {
            const projects: Project[] = snapshot.docs.map(docSnap => {
              const data: any = docSnap.data();
              return {
                id: docSnap.id,
                ...data,
                dueDate: data['dueDate']?.toDate?.() || data['dueDate']
              } as Project;
            });
            return of(projects);
          })
        )
      )
    );
  }
  
  // --------------------- TEAMS ---------------------
  addTeamMember(member: TeamMember): Observable<any> {
    return this.getCollectionPath('teams').pipe(
      switchMap((path) => from(addDoc(collection(this.firestore, path), member)))
    );
  }

  updateTeamMember(memberId: string, updates: Partial<TeamMember>): Observable<any> {
    return this.getCollectionPath('teams').pipe(
      switchMap((path) => from(updateDoc(doc(this.firestore, `${path}/${memberId}`), updates)))
    );
  }

  deleteTeamMember(memberId: string): Observable<any> {
    return this.getCollectionPath('teams').pipe(
      switchMap((path) => from(deleteDoc(doc(this.firestore, `${path}/${memberId}`))))
    );
  }

  getTeamMembers(): Observable<TeamMember[]> {
    return this.getCollectionPath('teams').pipe(
      switchMap((path) =>
        from(getDocs(collection(this.firestore, path))).pipe(
          switchMap(snapshot => {
            const members: TeamMember[] = snapshot.docs.map(docSnap => ({
              id: docSnap.id,
              ...docSnap.data()
            }) as TeamMember);
            return of(members);
          })
        )
      )
    );
  }
  
}
