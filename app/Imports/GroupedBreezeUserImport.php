<?php

namespace App\Imports;

use Illuminate\Support\Collection;

use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\Importable;
use App\Models\User;

/**
 * GroupedBreezeUserImport is built to parse out grouped families from a Breeze
 * import. This is done by separating couples out into their own user model and storing the
 * relationship in a pivot table. 
 * TODO: Store relationship and family hiearchy
 * 
 */
class GroupedBreezeUserImport implements ToCollection
{
    use Importable;
    
    /**
     * Grouped Breeze Import Structure
     * [
     * 0 => "Breeze ID"
     * 1 => "Family Name" - string separated by &
     * 2 => "First Name" - string separated by , Head of household first
     * 3 => "Last Name"
     * 4 => "Middle Name"
     * 5 => "Nickname"
     * 6 => "Maiden Name"
     * 7 => "Gender"
     * 8 => "Status"
     * 9 => "Marital Status" - married/single
     * 10 => "Birthdate"
     * 11 => "Birthdate Month/Day"
     * 12 => "Age"
     * 13 => "Family"
     * 14 => "Family Role" - "Head of Household" = father/husband
     * 15 => "Other family members (children)" - string separated by , or by 'and'
     * 16 => "Graduation Year"
     * 17 => "Grade"
     * 18 => "Mobile" - head house hold by default
     * 19 => "Home"
     * 20 => "Work"
     * 21 => "Email"  - head house hold by default
     * 22 => "Street Address"
     * 23 => "City"
     * 24 => "State"
     * 25 => "Zip"
     * 26 => "Added Date"
     * ]
     */
    /**
    * @param Collection $collection
    */
    public function collection(Collection $rows)
    {
        $header = $rows[0];
        $rows = $rows->toArray();
        
        array_shift($rows); // remove header row

        $inserts = 0;

        foreach ($rows as $row) {
            $names = $this->getFullNames($row);
            $email = $row[21];
            $phone = $row[18];

            $role = $row[14]; // does nothing right now
            $relationship_status = $row[9]; // should go to profile

            $children = $row[15]; // profile

            if ($children) {
                $children = $this->getChildren($children); // TODO: Handle kids - should go to profile model
            }

            $street_address = $row[22]; // profile model
            $city = $row[23]; // profile model
            $state = $row[24]; // profile model
            $zip = $row[25]; // profile model

            $age = $row[12]; // profile model
            $birthday = $row[10]; // profile model

            // TODO: Store family hiearchy
            for ($i=0; $i < count($names); $i++) { 
                if ($i > 0) {
                    User::create([
                        'name' => $names[$i],
                    ]);
                } else {
                    $exists = User::where('email', $email)->first();
                    
                    if (!$exists) {
                        User::create([
                            'name' => $names[$i],
                            'email' => $email,
                            'phone' => $phone
                        ]);
                    }
                }

                $inserts++;
            }
        }

        return $inserts;
    }

    /**
     * Parse family names and return an array of names
     * * If a couple is married the "first name" or $row[2] will read as {husban first name}, {wife first name}
     * * otherwise, it will just be a single name
     * 
     * @param array
     * @return array
     */
    private function getFullNames(array $row): array
    {        
        $names = explode(',', $row[2]);
        $last_name = $row[3];
        $formatted_names = [];
    
        foreach ($names as $name) {
            $formatted_names[] = $name . ' ' . $last_name;
        }

        return $formatted_names;
    }

    // TODO: Complete parsing different string formats of children
    private function getChildren(string $children)
    {
        return explode(',', $children);
    }
}
