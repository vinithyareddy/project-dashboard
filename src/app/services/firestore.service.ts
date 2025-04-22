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
  DocumentData,
  setDoc,
  collectionData
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { TeamMember } from '../models/team.model';
import { from, Observable, of, switchMap, take, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore, private authService: AuthService) { }

  private getUserPath(type: 'projects' | 'tasks' | 'teams'): Observable<string> {
    return this.authService.getUser().pipe(
      switchMap((user: any) => of(`users/${user?.uid}/${type}`))
    );
  }

  // ----------------- PROJECTS -----------------

  addProject(project: Project): Observable<any> {
    return this.getUserPath('projects').pipe(
      switchMap((path) => {
        const docRef = doc(collection(this.firestore, path));
        return from(setDoc(docRef, project)).pipe(map(() => ({ id: docRef.id })));
      })
    );
  }

  updateProject(id: string, updates: Partial<Project>): Observable<any> {
    return this.getUserPath('projects').pipe(
      switchMap((path) => from(updateDoc(doc(this.firestore, `${path}/${id}`), updates)))
    );
  }

  deleteProject(id: string): Observable<any> {
    return this.getUserPath('projects').pipe(
      switchMap((path) => from(deleteDoc(doc(this.firestore, `${path}/${id}`))))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.getUserPath('projects').pipe(
      switchMap((path) =>
        from(getDocs(collection(this.firestore, path))).pipe(
          map(snapshot =>
            snapshot.docs.map(docSnap => ({
              id: docSnap.id,
              ...docSnap.data(),
              dueDate: (docSnap.data()['dueDate'] as any)?.toDate?.() || docSnap.data()['dueDate']
            }) as Project)
          )
        )
      )
    );
  }

  // ----------------- TASKS -----------------

  addTask(task: Task): Observable<any> {
    return this.getUserPath('tasks').pipe(
      switchMap((path) => from(addDoc(collection(this.firestore, path), task)))
    );
  }

  updateTask(id: string, updates: Partial<Task>): Observable<any> {
    return this.getUserPath('tasks').pipe(
      switchMap((path) => from(updateDoc(doc(this.firestore, `${path}/${id}`), updates)))
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.getUserPath('tasks').pipe(
      switchMap((path) => from(deleteDoc(doc(this.firestore, `${path}/${id}`))))
    );
  }

  getTasks(): Observable<Task[]> {
    return this.getUserPath('tasks').pipe(
      switchMap((path) =>
        from(getDocs(collection(this.firestore, path))).pipe(
          map(snapshot =>
            snapshot.docs.map(docSnap => ({
              id: docSnap.id,
              ...docSnap.data(),
              dueDate: (docSnap.data()['dueDate'] as any)?.toDate?.() || docSnap.data()['dueDate']
            }) as Task)
          )
        )
      )
    );
  }

  // ----------------- TEAMS -----------------

  addTeamMember(member: TeamMember): Observable<any> {
    return this.getUserPath('teams').pipe(
      switchMap((path) => from(addDoc(collection(this.firestore, path), member)))
    );
  }

  updateTeamMember(id: string, updates: Partial<TeamMember>): Observable<any> {
    return this.getUserPath('teams').pipe(
      switchMap((path) => from(updateDoc(doc(this.firestore, `${path}/${id}`), updates)))
    );
  }

  deleteTeamMember(id: string): Observable<any> {
    return this.getUserPath('teams').pipe(
      switchMap((path) => from(deleteDoc(doc(this.firestore, `${path}/${id}`))))
    );
  }

  getTeamMembers(): Observable<TeamMember[]> {
    return this.getUserPath('teams').pipe(
      switchMap((path) =>
        from(getDocs(collection(this.firestore, path))).pipe(
          map(snapshot =>
            snapshot.docs.map(docSnap => ({
              id: docSnap.id,
              ...docSnap.data()
            }) as TeamMember)
          )
        )
      )
    );
  }
}
