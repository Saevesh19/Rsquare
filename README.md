# Rsquare
Smart Hotel Operations & Task Management System
Hackathon Project Report for RsquareSoft Recruitment Hackathon
Project Title
HospiFlow – Real-Time Hotel Operations Management System
1. Problem Statement

Most hotels still manage operations using:

WhatsApp messages
Phone calls
Handwritten registers
Manual staff coordination

This creates major operational problems:

Delayed complaint handling
Miscommunication between departments
Poor housekeeping coordination
No real-time tracking
No accountability of staff
No proper task prioritization
Guest dissatisfaction

Your solution digitizes and automates the entire operational workflow of a hotel in real time.

2. Proposed Solution Overview
Core Idea

Build a centralized web-based hotel operations management platform where:

Front desk controls and monitors operations
Housekeeping tasks are automated
Maintenance complaints are tracked live
Staff receive digital task assignments
Guests interact using room-specific QR codes
All operations are recorded in a centralized database
Real-time dashboards track hotel activity
3. Main Objectives
Goals of the System
Replace manual coordination with digital workflow
Improve hotel operational efficiency
Reduce complaint response time
Automate housekeeping scheduling
Increase accountability of staff
Improve guest experience
Enable real-time monitoring
Store all operational records digitally
4. Main Modules of the System
A. Front Desk Management Module
Responsibilities

Front desk acts as the central command center.

Features
View all room statuses
Approve or decline complaints
Assign tasks to staff
Monitor live operations
Verify completed tasks
Escalate delayed complaints
Track active staff
Monitor cleaning progress
View analytics and reports
Dashboard Should Show:
Total Rooms
Occupied Rooms
Vacant Rooms
Rooms Needing Cleaning
Maintenance Pending
Staff Active
Complaints Raised Today
Tasks Completed
Pending Tasks
Average Complaint Response Time
B. QR-Based Guest Interaction System

Each room gets a unique QR code.

QR Code Functions

Guests can:

Raise complaints
Order food
Request room service
Chat/contact reception
Request housekeeping
Request amenities
Check hotel services
Example Complaints
AC not working
Water leakage
WiFi issue
TV issue
Dirty room
Food delay
Complaint Workflow Logic (Important USP)
Step-by-Step Flow
Step 1:

Guest scans QR and raises complaint.

Step 2:

Complaint reaches front desk dashboard instantly.

Step 3:

Front desk gets 2-minute response window.

Options:

Approve
Decline
Reassign
Step 4:

If front desk does not respond within 2 minutes:

System automatically escalates task
Complaint is sent directly to relevant maintenance staff
Step 5:

Maintenance staff receives live notification.

Step 6:

Task status updates:

Pending
Accepted
In Progress
Completed
Verified
Step 7:

Front desk verifies completion.

C. Housekeeping Management Module
Features
Automatic room cleaning scheduling
Cleaning priority system
Live housekeeping task tracking
Staff allocation by floor/zone
Cleaning verification
Smart Cleaning Logic
Scenario:

Customer booking:

Check-in: Sunday 11 AM
Checkout: Tuesday 8 PM
System Logic:
Room marked occupied during stay
Before Sunday:
Cleaning scheduled automatically
After checkout:
Room status becomes “Needs Cleaning”
Housekeeping gets high-priority cleaning task
Front desk verifies readiness
Room becomes “Available”
Cleaning Priority Levels
High Priority → Upcoming check-in rooms
Medium Priority → Recently checked-out rooms
Low Priority → General cleaning
D. Maintenance Management Module
Features
Complaint categorization
Auto-routing to correct staff
SLA time tracking
Emergency complaint handling
Escalation system
Complaint Categories
Electrical
Plumbing
Internet/WiFi
Furniture
Appliances
Room Utilities
E. Food & Room Service Module
Features
Guests order through QR
Kitchen receives live orders
Delivery staff tracking
Order status updates
Order Flow

Guest → Kitchen → Prepared → Delivered → Confirmed

F. Staff Management Module
Features
Role-based task assignment
Shift tracking
Attendance management
Staff performance monitoring
Roles
Front Desk
Housekeeping
Maintenance
Kitchen Staff
Room Service
Manager/Admin
G. Biometric Attendance System
Features
Staff login using biometric system
Daily attendance tracking
Shift start/end recording
Late arrival detection
Why Important?

Without attendance integration:

Fake task completion possible
No accountability
No workforce visibility
H. Live Tracking & Monitoring Module
Real-Time Tracking

Manager and front desk can monitor:

Which staff is active
Current tasks
Complaint progress
Cleaning status
Delayed tasks
Food delivery progress
5. Important Additional Features (Highly Recommended)

These are the features that make your project look industry-level instead of student-level.

A. Task Priority Engine

System automatically assigns priorities based on:

VIP customer
Check-in timing
Emergency complaints
Delayed tasks
Occupancy level
B. Smart Notifications

Send alerts when:

Complaint pending too long
Cleaning overdue
Staff inactive
Room not ready before check-in
Emergency complaint raised
C. Audit Logs

Every activity stored:

Who assigned task
Who completed task
Time taken
Verification logs

This increases accountability.

D. Role-Based Access Control

Not everyone should access everything.

Example
Housekeeping Staff:
Only see cleaning tasks
Maintenance Staff:
Only maintenance-related tasks
Manager:
Access all analytics

This improves security.

E. Analytics & Reports

Manager dashboard should show:

Most common complaints
Staff performance
Average cleaning time
Most delayed department
Occupancy trends
Complaint resolution rate
F. Emergency Handling

Special emergency mode for:

Fire alerts
Medical emergency
Security issue

Emergency tasks bypass approval workflow.

G. Offline Safety Mechanism

If internet disconnects:

Data stored temporarily
Auto-sync when connection restores

This is important in real hotel environments.

H. Multi-Floor Management

For larger hotels:

Divide staff floor-wise
Separate dashboards by floor
Faster task assignment
I. Guest Feedback System

After task completion:

Guest gives rating
Feedback stored

Useful for service quality tracking.

J. Photo Proof Verification

Housekeeping or maintenance staff uploads photo after completing task.

Example:

Cleaned room photo
Repaired appliance photo

This prevents fake completion.

6. Website Pages Structure
Main Pages
Guest Side
QR Complaint Page
Food Ordering Page
Chat Support Page
Staff Side
Staff Login
Task Dashboard
Attendance Page
Task Status Update Page
Front Desk Side
Central Monitoring Dashboard
Complaint Approval Panel
Room Management
Task Assignment
Manager/Admin Side
Analytics Dashboard
Staff Monitoring
Reports
Hotel Activity Logs
7. Suggested Database Structure
Main Tables
Rooms
Room ID
Status
Floor
Cleaning Status
Guests
Guest ID
Room Number
Booking Details
Complaints
Complaint ID
Type
Priority
Status
Assigned Staff
Staff
Staff ID
Department
Attendance
Tasks
Task ID
Deadline
Status
Assigned To
Orders
Food Orders
Delivery Status
Logs
All activities history
8. Recommended Technology Stack

You are showing on localhost and GitHub only, so keep stack practical and lightweight.

Frontend
Recommended:
HTML
CSS
JavaScript
React.js

Why?

Fast UI development
Real-time dashboard support
Component reuse
Backend
Recommended:
Node.js + Express.js

Why?

Fast APIs
Real-time communication
Easy integration with frontend
Database
Recommended:
MongoDB

Why?

Flexible structure
Fast for real-time systems
Easy JSON integration

Alternative:

MySQL if team stronger in SQL
Real-Time Communication
Use:
Socket.IO

Why?
Needed for:

Live notifications
Real-time task updates
Dashboard auto-refresh

Without this, your project becomes just a CRUD app.

Authentication
Use:
JWT Authentication

Features:

Secure login
Role-based access
Session control
QR Code Generation
Use:
QRCode.js library
UI Framework
Use:
Tailwind CSS or Bootstrap

For:

Fast responsive UI
Professional dashboard
Version Control
Use:
GitHub

Maintain:

Proper commits
Separate branches
README documentation
9. Security Measures (Very Important)

Most student projects ignore this completely.

Essential Security Features
1. Password Hashing

Use:

bcrypt

Never store raw passwords.

2. Role-Based Authorization

Prevent unauthorized access.

3. Input Validation

Prevent:

SQL Injection
Invalid requests
4. Secure APIs

Use protected backend routes.

5. Complaint Spam Protection

Prevent fake repeated complaints.

6. Activity Logging

Track suspicious actions.

10. UI/UX Suggestions

Your UI can decide whether recruiters take you seriously or not.

Dashboard Should Be:
Minimal
Fast
Easy to understand
Color-coded statuses
Suggested Colors
Green → Completed
Red → Urgent
Yellow → Pending
Blue → Active
Important UI Features
Live notification bell
Task timers
Search/filter tasks
Mobile responsive design
Floor-wise filters
11. Project Workflow Summary
Complete Workflow
Booking Created

↓
Room reserved

Before Check-in

↓
Cleaning task auto-generated

Guest Arrives

↓
Room marked occupied

Guest Uses QR

↓
Complaint/order generated

Front Desk Verification

↓
2-minute approval window

Auto-Escalation

↓
Task sent to staff

Task Completion

↓
Front desk verification

Checkout

↓
Cleaning task auto-generated

Room Available Again
