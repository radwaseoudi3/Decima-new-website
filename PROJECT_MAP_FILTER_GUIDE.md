# Projects Map Filter Guide

The Projects page uses the world map as a regional filter for the project cards below it.

## Region behavior

- `All Regions` shows every project profile.
- `Americas`, `EMEA`, and `APAC` show project cards associated with that region.
- Cards marked `Global` remain visible in each region because they represent worldwide programs.
- Clicking a map marker selects that marker's region.

## Project card setup

Each `.project-card-wrap` uses two attributes:

- `data-project-regions="Americas"` or `data-project-regions="Global"`
- `data-project-categories="Americas|Greenfield|Data Centers"`

To associate a future project with more than one region, separate regions with a pipe:

```html
data-project-regions="EMEA|APAC"
```

The project-type buttons and map region selection work together. The reset button restores `All Regions` and `All Types`.
