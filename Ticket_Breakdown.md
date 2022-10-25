# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### **Ticket 1 - make addCustomIds function and toggle**

First we need to make the function that allows a Facility to generate a custom ID for each Agent they work with.

**Details to confirm**

- Does "custom ID" mean the facility should be able to generate the ID with some level of customization (using manually entered nicknames/usernames, by specifying a format template using existing data, etc...), or should it just be a randomly generated ID unique for the facility?
  - If we allow Facilities to use a custom template/formula to generate these new IDs, do we need to add safeguards to ensure their formula always produces unique IDs?
  - If we allow Facilities to manually enter these IDs, where in the database should they be stored? Assuming there's information for a Facility about which Agents they've worked with in the past, I imagine the IDs could be stored there, but should confirm situation before making decision.
- Should Facilities be able to edit these IDs once they're generated?

**Basic case plan**

The most basic case of this ticket is that this feature will be an option Facilities can toggle on/off. Assuming there's already an account settings page, we'd add the toggle there, and when a Facility opts into the feature, the customs IDs are randomly generated and saved for every existing Agent to be used going forward. When new Agent is scheduled by Facility, a custom ID is generated if feature is turned on.

When a Shift is scheduled, this custom ID will be saved along with the other Agent metadata.

**Time Estimate**

Considering the most basic case described above, this should take at most two days. Depending on how much customization we actually want to allow for these IDs, though, it could take up to a week to add the needed checks/guards/tests to ensure IDs stay unique.

### **Ticket 2 - update `generateReport` to use custom IDs**

Update `generateReport` so the report reflect the custom Agent IDs if a Facility opted in to using them.

**Time Estimate**

This should take at most one day. Since we're already saving the custom ID as a piece of metadata for the Agent in the Shift information, the `generateReport` function only needs to be updated to check whether that metadata exists, and to use it instead of the internal ID if it does.
